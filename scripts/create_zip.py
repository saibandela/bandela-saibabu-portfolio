import os
import zipfile

def create_project_zip():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    public_dir = os.path.join(base_dir, "public")
    os.makedirs(public_dir, exist_ok=True)
    
    zip_path = os.path.join(public_dir, "bandela_saibabu_portfolio.zip")
    
    # Exclude folders
    exclude_dirs = {"node_modules", "dist", ".git", ".cache", "__pycache__", "public"}
    exclude_files = {".DS_Store", "bandela_saibabu_portfolio.zip"}
    
    print(f"Creating zip archive at: {zip_path}")
    
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(base_dir):
            # Prune excluded dirs
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if file in exclude_files:
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, base_dir)
                
                # Prepend root folder name for clean unzipping
                zip_entry_name = os.path.join("bandela-saibabu-portfolio", arcname)
                zipf.write(file_path, zip_entry_name)
                print(f"Added: {arcname}")

    file_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Successfully generated zip ({file_size_mb:.2f} MB)")

if __name__ == "__main__":
    create_project_zip()
