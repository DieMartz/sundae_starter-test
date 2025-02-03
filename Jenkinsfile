pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la
                '''
            }
        }
        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine3.20'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm test
                '''
            }
        }
        stage('E2E') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.46.0-noble'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    npm i serve
                    node_modules/.bin/serve dist &
                    sleep 10
                    npx playwright test
                '''
            }
        }
    }
    post {
        always {
            junit skipMarkingBuildUnstable: true, allowEmptyResults: true, testResults: '**/vitest-results/*.xml'
        }
    }
}