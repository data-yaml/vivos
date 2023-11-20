.PHONY: all clean download typegen

TYPE_DIR = src/types
TYPE_EXT = d.ts

# URLs

PETSTORE_URL = https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml
TOWER_URL = https://tower.nf/openapi/nextflow-tower-api-latest.yml
BENCHLING_URL = https://benchling.com/api/v2/openapi.yaml

# YAML

PETSTORE_YAML = api/petstore.yaml
TOWER_YAML = api/tower.yaml
BENCHLING_YAML = api/benchling.yaml

# TYPEs

PETSTORE_TYPE = $(TYPE_DIR)/petstore.$(TYPE_EXT)
TOWER_TYPE = $(TYPE_DIR)/tower.$(TYPE_EXT)
BENCHLING_TYPE = $(TYPE_DIR)/benchling.$(TYPE_EXT)

all: download typegen

clean:
	rm -f "*.yaml"
	rm -f "$(TYPE_DIR)/*.$(TYPE_EXT)"

#
# Download OpenAPI specs
#

$(PETSTORE_YAML):
	@curl -s -o $(PETSTORE_YAML) $(PETSTORE_URL)

$(TOWER_YAML):
	@curl -s -o $(TOWER_YAML) $(TOWER_URL)

$(BENCHLING_YAML):
	@curl -s -o $(BENCHLING_YAML) $(BENCHLING_URL)

download: $(PETSTORE_YAML) $(TOWER_YAML) $(BENCHLING_YAML)
	@echo "Downloaded OpenAPI specs"

#
# Generate TypeScript types
#

typegen: download $(PETSTORE_TYPE) $(TOWER_TYPE) $(BENCHLING_TYPE)
	@echo "Generated TypeScript types"

$(TYPE_DIR):
	@echo "Creating directory $(TYPE_DIR)"
	@mkdir -p $(TYPE_DIR)

$(PETSTORE_TYPE): $(PETSTORE_YAML) $(TYPE_DIR)
	@echo "Generating types for Petstore"
	@npx openapicmd typegen $(PETSTORE_YAML) > $(PETSTORE_TYPE)

$(TOWER_TYPE): $(TOWER_YAML) $(TYPE_DIR)
	@echo "Generating types for Tower"
	@npx openapicmd typegen $(TOWER_YAML) > $(TOWER_TYPE)

$(BENCHLING_TYPE): $(BENCHLING_YAML) $(TYPE_DIR)
	@echo "Generating types for Benchling"
	@npx openapicmd typegen $(BENCHLING_YAML) > $(BENCHLING_TYPE)
