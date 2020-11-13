const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const emsprompts = require('./emsprompts');
const cTable = require('console.table');

const logo = require('asciiart-logo');
const DB = require("../db/ems_db");
const { Console } = require("console");