/*
  This Script generates mock data for local development
  Data is realistic and randomised so no need for an API
*/

/*
  eslint-disable no-console
*/

import jfs from 'json-schema-faker';
import {schema} from './mockDataSchema';
import fs from 'fs';
import chalk from 'chalk';

const json = JSON.stringify(jfs(schema));

fs.writeFile("./src/api/db.json", json, function(err) {
  if(err){
    return console.log(chalk.red(err));
  }else{
    console.log(chalk.green('Mock data generated'));
  }
});
