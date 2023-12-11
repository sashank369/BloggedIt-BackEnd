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
        stage('Stage 3: Build and push docker image') {
            steps {
                echo 'Deploying....'
                script {
                    def dockerImage = docker.build("antonml/node-demo:master")
                    docker.withRegistry('', 'demo-docker') {
                        dockerImage.push('master')
                    }
                }
            }
        }
    }
}