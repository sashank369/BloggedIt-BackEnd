pipeline{
    environment{
        docker_image = ""
    }
    agent any
    stages{
        stage('Stage 1: Git Clone'){
            steps{
                git branch: 'main',
                url:'https://github.com/sashank369/BloggedIt-BackEnd.git'
            }
        }
        stage('Stage 2: Test'){
            steps {
                echo 'Building..'
                sh 'npm install'
                echo 'Testing..'
                sh 'npm test'
            }
        }
        stage('Stage 3: Build Docker image') {
            steps {
                echo 'Building Docker image..'
                script {
                    docker_image = docker.build "rithvikramasani/bloggedit-backend:lastest"
                }
            }
        }

        stage('Stage 4: Push Docker image') {
            steps {
                echo 'Pushing Docker image..'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        docker_image.push()
                    }
                }
            }
        }
    }
}