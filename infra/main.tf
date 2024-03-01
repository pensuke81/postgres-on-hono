provider "google" {
  project         = var.project_id
  region          = "asia-northeast1"
  billing_project = var.project_id
}

module "sql-db" {
  source              = "GoogleCloudPlatform/sql-db/google//modules/postgresql"
  version             = "8.0.0"
  project_id          = var.project_id
  database_version    = "POSTGRES_15"
  name                = "test-postgres-on-workers"
  region              = "asia-northeast1"
  tier                = "db-f1-micro"
  zone                = "asia-northeast1-a"
  deletion_protection = false
  ip_configuration = {
    ipv4_enabled    = true
    private_network = ""
    require_ssl     = false
    authorized_networks = [
      { name = "public", value = "0.0.0.0/0" }
    ]
  }
  database_flags = [{
    name  = "max_connections"
    value = 14 # min value for connection pooling test
  }]
}
