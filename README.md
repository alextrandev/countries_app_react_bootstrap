# Countries app with React and Bootstrap

## Docker instruction

Start a build ```docker build --tag app .```
Run the image ```docker run --publish 3009:8081 app```
The app should run on ```http://localhost:3009```

Create build for dockerhub ```docker build . -t "app:v1.0"```
Login ```docker login```
Add tag ```docker tag IMAGE_NAME USER_NAME/REPO_NAME:TAG_NAME```
Push to docker hub ```docker push USER_NAME/REPO_NAME:TAG_NAME```