# Purpose
Testing performance of adjusting which slicing plane to pick while building the BSP tree in CSG.js 

# How to test

    git clone https://github.com/AllwineDesigns/csgjs_test.git
    cd csgjs_test
    npm install
    cp trees.js node_modules/@jscad/csg/src/trees.js
    src/stl_boolean -a stl/torus.stl -b stl/sphere.stl -u out.stl

# Make adjustments

Change the index that is chosen on line 485 of node_modules/@jscad/csg/src/trees.js to see how it affects performance. The torus and sphere provided show the most dramatic performance improvement that I've seen, but other
models often see an improvement as well.
