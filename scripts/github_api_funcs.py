import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

def get_token():
    """Retrieve the GitHub token from environment variables."""
    return os.getenv('GITHUB_TOKEN')

def get_target_info():
    """Retrieve the target type and name from environment variables."""
    return os.getenv('GITHUB_TARGET_TYPE'), os.getenv('GITHUB_TARGET_NAME')

def test_token(token):
    """Test the GitHub token by fetching the current user's profile."""
    response = requests.get('https://api.github.com/user', headers={'Authorization': f'token {token}'})
    if response.status_code == 200:
        print("Token is valid.")
        return True
    else:
        print("Token is invalid or expired.")
        return False
    
def list_org_repos(token, org_name):
    """List all repositories for a given organization."""
    url = f'https://api.github.com/orgs/{org_name}/repos'
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.v3+json'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()  # List of repositories
    else:
        print(f"Failed to list repositories for {org_name}, Status Code: {response.status_code}")
        return None

def fetch_profile(token, target_type, target_name):
    """Fetch profile information of a specified organization or user."""
    if target_type == 'organization':
        url = f'https://api.github.com/orgs/{target_name}'
    elif target_type == 'user':
        url = f'https://api.github.com/users/{target_name}'
    else:
        print("Invalid target type. Use 'organization' or 'user'.")
        return None

    response = requests.get(url, headers={'Authorization': f'token {token}'})
    if response.status_code == 200:
        return response.json()
    else:
        # Parse the JSON response body to extract the error message
        error_message = json.loads(response.text).get('message', 'Failed to fetch data')
        print(f"Failed to fetch data: {error_message}, status: {response.status_code}")
        return None
    
def list_org_projects(token, org_name):
    """Fetch all projects for a given organization, handling pagination."""
    projects = []
    url = f'https://api.github.com/orgs/{org_name}/projects'
    headers = {
        'Authorization': f'token {token}',
        'Accept': 'application/vnd.github.inertia-preview+json'
    }
    
    while url:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            projects.extend(response.json())
            # Check if there is a 'next' page
            if 'next' in response.links:
                url = response.links['next']['url']
            else:
                url = None
        else:
            print(f"Failed to fetch projects, status code: {response.status_code}")
            break

    return projects

def list_org_projects_v2(token, org_login):
    """Fetch all projectsV2 for a given organization, handling pagination with GraphQL."""
    projects = []
    graphql_url = 'https://api.github.com/graphql'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }
    query = """
    query($orgLogin: String!, $cursor: String) {
      organization(login: $orgLogin) {
        projectsV2(first: 100, after: $cursor) {
          edges {
            node {
              id
              title
              url
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
    """
    variables = {'orgLogin': org_login, 'cursor': None}

    while True:
        response = requests.post(graphql_url, headers=headers, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            data = response.json()['data']['organization']['projectsV2']
            projects.extend([edge['node'] for edge in data['edges']])
            if data['pageInfo']['hasNextPage']:
                variables['cursor'] = data['pageInfo']['endCursor']
            else:
                break
        else:
            print(f"Failed to fetch projectsV2, status code: {response.status_code}")
            break

    return projects

def list_org_projects_v2_with_issues(token, org_login):
    projects_with_issues = []
    graphql_url = 'https://api.github.com/graphql'
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }
    query = """
    query($orgLogin: String!, $cursor: String) {
    organization(login: $orgLogin) {
        projectsV2(first: 10, after: $cursor) {
        edges {
            node {
            id
            title
            url
            items(first: 100) {
                nodes {
                id
                ... on ProjectV2Item {
                    type
                    content {
                    ... on Issue {
                        id
                        title
                        url
                    }
                    }
                }
                }
            }
            }
        }
        pageInfo {
            endCursor
            hasNextPage
        }
        }
    }
    }
    """
    variables = {'orgLogin': org_login, 'cursor': None}

    while True:
        response = requests.post(graphql_url, headers=headers, json={'query': query, 'variables': variables})
        response_json = response.json()
        if response.status_code == 200:
            if 'errors' in response_json:
                print(f"Error in GraphQL query: {response_json['errors']}")
                break
            data = response_json.get('data', {}).get('organization', {}).get('projectsV2', None)
            if data is None:
                print("No projectsV2 data found.")
                break
            for edge in data['edges']:
                project = edge['node']
                
                # Adjusted filtering logic to account for nested structure
                issues = [{
                    'id': item['content']['id'],
                    'title': item['content']['title'],
                    'url': item['content']['url']
                } for item in project['items']['nodes'] if item['type'] == 'ISSUE']
                
                if issues:  # Check if there are any issues
                    projects_with_issues.append({
                        'id': project['id'],
                        'title': project['title'],
                        'url': project['url'],
                        'issues': issues
                    })
            if not data['pageInfo']['hasNextPage']:
                break
            variables['cursor'] = data['pageInfo']['endCursor']
        else:
            print(f"Failed to fetch projectsV2 with issues, status code: {response.status_code}, response: {response_json}")
            break

    return projects_with_issues


if __name__ == "__main__":
    # Validate Token and extract profile information
    profile = None
    projects = None
    token = get_token()
    target_type, target_name = get_target_info()
    if token and test_token(token):
        profile = fetch_profile(token, target_type, target_name)
        if profile:
            print(f"{target_type.capitalize()} Profile:", profile['name'])
        else:
            print("Could not retrieve profile.")
    else:
        print("Exiting due to invalid token.")
        
    if profile and target_type == 'organization':
        repos = list_org_repos(token, target_name)
        if repos:
            print(f"Repositories for {target_name}:")
            for repo in repos:
                print(f"- {repo['name']}: {repo['html_url']}")
        else:
            print("Could not retrieve repositories.")
            
        projects = list_org_projects(token, target_name)
        if projects:
            print(f"Projects V1 for {target_name}:")
            for project in projects:
                print(f"- {project['name']}: {project['html_url']}")
        else:
            print("Could not retrieve projects.")
          
        projectsV2 = list_org_projects_v2(token, target_name)
        if projectsV2:
            print(f"Projects V2 for {target_name}:")
            for project in projectsV2:
                print(f"- {project['title']}: {project['url']}")
        else:
            print("Could not retrieve projects.")
            
        projects_with_issues = list_org_projects_v2_with_issues(token, target_name)
        selected_project_title = "@jm1021's CSSE 1-2,  2025"
        selected_project = next((project for project in projects_with_issues if project['title'] == selected_project_title), None)
        
        if selected_project:
            print(f"Issues for project {selected_project['title']}:")
            if 'issues' in selected_project and selected_project['issues']:
                for issue in selected_project['issues']:
                    print(f"- {issue['title']}: {issue['url']}")
            else:
                print("No issues found for this project.")
        else:
            print("Project not found.")
            