import * as fs from "fs";
import * as path from "path";

// List of all model folders
const models = [
  "profile",
  "experience",
  "projects",
  "skills",
  "leadership",
  "product",
  "business-analysis",
  "learning",
  "certifications",
  "courses",
  "metrics",
  "timeline",
  "resume",
  "linkedin",
  "website",
  "blog",
  "interviews",
  "assets",
];

async function runValidationTests() {
  console.log("🚀 Starting data validation testing...\n");
  let passedCount = 0;
  let failedCount = 0;

  for (const model of models) {
    try {
      // 1. Read example JSON
      const jsonPath = path.join(__dirname, "..", "data", model, "example.json");
      const rawData = fs.readFileSync(jsonPath, "utf-8");
      const jsonData = JSON.parse(rawData);

      // 2. Import Zod validation helper
      const validationModulePath = `../data/${model}/validation`;
      const validationModule = await import(validationModulePath);

      // Convert folder key to CamelCase validator name
      const camelName = model.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      const capName = camelName.charAt(0).toUpperCase() + camelName.slice(1);
      const validatorFnName = `validate${capName}`;

      const validatorFn = validationModule[validatorFnName];
      if (typeof validatorFn !== "function") {
        throw new Error(
          `Validator function ${validatorFnName} not found in ${validationModulePath}`,
        );
      }

      // 3. Parse data
      validatorFn(jsonData);
      console.log(`✅ [${model}] Schema verification passed.`);
      passedCount++;
    } catch (err: any) {
      console.error(`❌ [${model}] Verification failed:`, err.message);
      failedCount++;
    }
  }

  console.log(`\n📊 Test Summary: ${passedCount} passed, ${failedCount} failed.`);
  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log("🎉 All data validations passed successfully!");
  }
}

runValidationTests();
