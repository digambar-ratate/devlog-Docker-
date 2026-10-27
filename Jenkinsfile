pipeline {
    agent any

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['staging', 'production'], description: 'Select deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Check to run backend/frontend tests')
    }

    stages {
        stage('Run Tests') {
            when {
                expression { params.RUN_TESTS == true }
            }
            stages {
                stage('Test Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm test'
                        }
                    }
                }
                stage('Test Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm run build'
                        }
                    }
                }
            }
        }

        stage('Manager Approval') {
            steps {
                script {
                    input message: "Approve deployment to ${params.ENVIRONMENT}?",
                          ok: "Deploy"
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo "Deploying to ${params.ENVIRONMENT}..."
                sh "docker compose down"
                sh "docker compose up -d --build"
            }
        }
    }
    
    post {
        success {
            echo "Deployment successful!"
        }
        failure {
            echo "Deployment failed."
        }
    }
}
