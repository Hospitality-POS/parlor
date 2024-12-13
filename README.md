## COMMANDS TO USE DURING DEPLOYMENT
Run the scripts below that fit your situation:
> you can choose to use bash or sh or rather chmod +x the deploment sript file

# Start services and seed data
```bash
sh DeploymentScript.sh start
```
# Stop services
```bash
sh script.sh stop
```

# Restart services and seed data
```bash
sh DeploymentScript.sh restart
```

# Only run seed commands and remove backend containers
```bash
sh DeploymentScript.sh 
```

# Update frontend image and redeploy
```bash
sh DeploymentScript.sh update-frontend
```

# Update backend image, redeploy, and seed data
```bash
sh DeploymentScript.sh update-backend
```

# Update both frontend and backend images, redeploy, and seed data

```bash
sh DeploymentScript.sh update-services
```
>In this case it will use existing data
