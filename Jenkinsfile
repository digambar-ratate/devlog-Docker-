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
                stage('Test Backend (Python)') {
                    steps {
                        dir('backend') {
                            // Install requirements and run python tests if you have them
                            sh 'pip install -r requirements.txt'
                            // Uncomment the line below if you add python tests later (e.g., pytest)
                            // sh 'pytest'
                        }
                    }
                }
                stage('Test Frontend (Node.js)') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
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
