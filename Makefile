PROJECT_ID := <project id>
ACCOUNT := <account>
CHART_VIEWER_APP := jma-xml-chart-viewer

usage:
	@echo "usage: make <rule>"

set-cloud-configs:
	gcloud config set account $(ACCOUNT)
	gcloud config set project $(PROJECT_ID)

init:
	gcloud beta billing projects link $(PROJECT_ID) --billing-account=$(ACCOUNT_ID)
	gcloud services enable cloudbilling.googleapis.com
	gcloud services enable cloudbuild.googleapis.com
	gcloud services enable run.googleapis.com

deploy-chart-viewer:
	gcloud builds submit . --tag asia.gcr.io/$(PROJECT_ID)/$(CHART_VIEWER_APP)
	gcloud run deploy $(CHART_VIEWER_APP) \
		--project $(PROJECT_ID) \
		--image asia.gcr.io/$(PROJECT_ID)/$(CHART_VIEWER_APP) \
		--platform managed \
		--region asia-northeast1 \
		--memory 128Mi \
		--concurrency 1 \
		--max-instances 2 \
		--allow-unauthenticated

