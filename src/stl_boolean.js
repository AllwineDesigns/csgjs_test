#!/usr/bin/env node

const fs = require('fs');
const stlDeSerializer = require('@jscad/stl-deserializer').deserialize;
const jscad = require('@jscad/openjscad');
const scadApi = require('@jscad/scad-api');
const program = require('commander');
const csg = require('@jscad/csg');

program
  .arguments('<output file>')
  .option('-a <a_file>', 'STL file A')
  .option('-b <b_file>', 'STL file B')
  .option('-i', 'do intersection')
  .option('-u', 'do union')
  .option('-d', 'do difference')
  .action(function(output_file) {
    const aData = fs.readFileSync(program.A);
    const bData = fs.readFileSync(program.B);

    const aCSG = stlDeSerializer(aData, program.A, { output: 'csg' })
    const bCSG = stlDeSerializer(bData, program.B, { output: 'csg' })

    let newCSG;

    var hrstart = process.hrtime();

    if(program.I) {
      newCSG = aCSG.intersect(bCSG);
    } else if(program.D) {
      newCSG = aCSG.subtract(bCSG);
    } else {
      newCSG = aCSG.union(bCSG);
    }

    var hrend = process.hrtime(hrstart);

    console.log("Time: %ds %dms", hrend[0], hrend[1]/1000000)
    fs.writeFileSync(output_file, jscad.generateOutput('stlb', newCSG).asBuffer())
  })
  .parse(process.argv);
