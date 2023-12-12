pipeline{
    environment{
        registry = "rithvikramasani/bloback"
        dockerImage = ""
        PORT = 3001
        CONNECTION_URL = "mongodb+srv://rithvikramasani:rithvikramasani@cluster0.sgvjxgt.mongodb.net/"
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
        stage('Building image') {
            steps{
                script {
                dockerImage = docker.build registry + ":latest"
                }
            }
        }
        stage('Deploy Image') {
            steps{
                script {
                    docker.withRegistry( '', 'DockerHubCred' ) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Ansible Deploying the Docker Image'){
            steps{
                echo 'Deploying the Docker Image'
                ansiblePlaybook becomeUser:null,
                colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: 'Deployment/inventory',
                playbook: 'Deployment/playbook.yml',
                sudoUser: null
            }
        }
    }
}