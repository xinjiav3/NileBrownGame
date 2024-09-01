#!/bin/bash

# Upgrade and install packages for Ubuntu
echo "=== Upgrade Packages ==="
sudo apt update

# Install Java 17
echo "=== Install Java 17 ==="
sudo apt install -y openjdk-17-jdk-headless
sudo apt install -y openjdk-17-jre
