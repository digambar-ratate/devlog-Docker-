pipeline {
    agent any

    parameters {
        choice(
				name: 'ENVIRONMENT', 
				choices: ['staging', 'production'], 
				description: 'Select deployment environment'
			)
        booleanParam(
				name: 'RUN_TESTS', 
				defaultValue: true, 
				description: 'Check to run backend/frontend tests'
		)
    }

    stages {
        stage('Run Tests') {
            when {
                expression { params.RUN_TESTS == true }
            }
            parallel {
                stage('Test Backend (Python)') {
                    steps {
                        dir('backend') {
                            sh 'pip install -r requirements.txt'
                        }
                    }
                }
                stage('Test Frontend (Node.js)') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
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
            emailext(
			to: 'ratatedigambar02@gmail.com',
			subject: "Deploynment Successful",
			body: """
                    Deployment completed successfully.

                    Environment: ${params.ENVIRONMENT}
                    Build Number: ${env.BUILD_NUMBER}
                    Build URL: ${env.BUILD_URL}
				  """
			)
        }
        failure {
            emailext(
			to: 'ratatedigambar02@gmail.com',
			subject: 'Deploynment Unsuccessful',
			body: """Deployment failed.

                    Environment: ${params.ENVIRONMENT}
                    Build Number: ${env.BUILD_NUMBER}
                    Build URL: ${env.BUILD_URL}

                    Please check the Jenkins console output."""
			)
        }
    }
}
