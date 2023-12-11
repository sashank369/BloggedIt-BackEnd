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
                sh 'docker build -t sashank369/blogged-it-backend .'
            }
        }
    }
}