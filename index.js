#!/usr/bin/env node
import { execSync } from "node:child_process";
import { input, select } from "@inquirer/prompts";
import path from "node:path";
import fs from "node:fs";

// execSync("ping google.com", { stdio: "inherit" });

// ask function
const getprojectDetails = async () => {
  const projectType = await select({
    message: "What type of project do you want to create?",
    choices: ["Frontend", "Backend", "Fullstack"],
  });

  const projectName = await input({
    message: "What is the name of your project?",
    validate: (value) => (value ? true : "Project name cannot be empty!"),
  });

  return { projectType, projectName };
};

const startProcessing = async () => {
  try {
    const { projectType, projectName } = await getprojectDetails();

    const targetPath = path.join(process.cwd(), projectName);

    // check if target exists
    if (fs.existsSync(targetPath)) {
      console.error(`Directory ${projectName} already exists!`);
      process.exit(1);
    }

    let repoUrl;

    switch (projectType) {
      case "Frontend": {
        repoUrl = "https://github.com/FredOfficial/boilerplate-backend.git";
        break;
      }
      case "Backend": {
        repoUrl = "https://github.com/FredOfficial/boilerplate-backend.git";
        break;
      }
      case "Fullstack": {
        repoUrl = "https://github.com/FredOfficial/boilerplate-backend.git";
        break;
      }
      default:
    }

    console.log(`Cloning the ${projectType} boilerplate to repository.`);
    execSync(`git clone ${repoUrl} "${targetPath}"`, { stdio: "inherit" });

    console.log(`Remove .git folder from the cloned repository...`);
    fs.rmSync(path.join(targetPath, ".git"), {
      recursive: true,
      force: true,
    });

    console.log("Installing dependencies...");
    execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });

    console.log("Setup complete.");
    console.log("Run the following commands to start your app:");
    console.log(`  cd ${projectName}`);
    console.log(`  npm run dev`);
  } catch (err) {
    console.error("Failed to set up the project!", err.message);
    process.exit(1);
  }
};

startProcessing();
