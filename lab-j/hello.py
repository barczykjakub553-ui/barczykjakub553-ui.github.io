import sys

name = "Jakub"
album = "57722"
version = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
location = sys.executable

print(f"Hello {name} ({album}). This environment is using Python version {version} at location {location}.")
