import json
from azure.storage.blob import BlobServiceClient
from user.models import UserDetails
from .models import *

from login.settings import *

def get_blob_service_client():
    # This function should return a BlobServiceClient initialized with your Azure Storage account details
    # Replace these with your actual Azure Storage account credentials
    account_name = AZURE_ACCOUNT_NAME
    account_key = AZURE_ACCOUNT_KEY
    connection_string = f"DefaultEndpointsProtocol=https;AccountName={account_name};AccountKey={account_key};EndpointSuffix=core.windows.net"
    
    # Initialize and return the BlobServiceClient
    return BlobServiceClient.from_connection_string(connection_string)

def download_blob(blob_name):
    blob_service_client = get_blob_service_client()    
    container_client = blob_service_client.get_container_client(AZURE_CONTAINER)
    blob_client = container_client.get_blob_client(blob_name)
    blob_data = blob_client.download_blob().readall()
    return blob_data

def getCerificate(id):  
    try: 
        user = UserDetails.objects.get(StudentId=id)
        return user.certificate

    except   UserDetails.DoesNotExist:
        return None
    
def download_list_blob(blob_name):
    blob_service_client = get_blob_service_client()    
    container_client = blob_service_client.get_container_client(AZURE_CONTAINER)
    files = []
    for blob in container_client.list_blobs(name_starts_with=blob_name):
        blob_data = container_client.get_blob_client(blob).download_blob().readall()
        json_content_str = blob_data.decode('utf-8')
        json_data = json.loads(json_content_str)
        files.append(json_data)
    return  files