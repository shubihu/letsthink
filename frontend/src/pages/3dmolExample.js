import React, { useRef, useEffect, useState }from 'react';

import '../css/3dmol.css';

const ThreedmolDemo = () => {
  const $3Dmol = window.$3Dmol;
  const containerRef = useRef(null);
  const viewerRef = useRef(null); // 创建一个ref来保存viewer
  const [center, setCenter] = useState({ x: 0, y: 0, z: 0 });
  const [size, setSize] = useState({ x: 0, y: 0, z: 0 });
  const [sizeW, setSizeW] = useState({ x: 0, y: 0, z: 0 });
  const [sizeH, setSizeH] = useState({ x: 0, y: 0, z: 0 });
  const [sizeD, setSizeD] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  
  useEffect(() => {
    var element1 = containerRef.current;
    if (element1) {
      viewerRef.current = $3Dmol.createViewer(element1);

      $3Dmol.download("pdb:1MO8", viewerRef.current, { multimodel: true, frames: true }, function () {
        viewerRef.current.setStyle({}, { cartoon: { color: 'spectrum' } });
        var atoms = viewerRef.current.selectedAtoms({});
        let len = atoms.length;
        let xTot = 0;
        let yTot = 0;
        let zTot = 0;
        let minX = 1e100;
        let minY = 1e100;
        let minZ = 1e100;
        let maxX = -1e100;
        let maxY = -1e100;
        let maxZ = -1e100;
        for (var i = 0; i < len; i++) {
            let atom = atoms[i];
            let x = atom.x;
            let y = atom.y;
            let z = atom.z;
            xTot += x;
            yTot += y;
            zTot += z;
            if (x > maxX) {
                maxX = x;
            }
            if (y > maxY) {
                maxY = y;
            }
            if (z > maxZ) {
                maxZ = z;
            }
            if (x < minX) {
                minX = x;
            }
            if (y < minY) {
                minY = y;
            }
            if (z < minZ) {
                minZ = z;
            }
        }

        let centerX = xTot / len;
        let centerY = yTot / len;
        let centerZ = zTot / len;
        let sizeX = 0.25 * (maxX - minX);
        let sizeY = 0.25 * (maxY - minY);
        let sizeZ = 0.25 * (maxZ - minZ);

        let sizeWx = sizeX;
        let sizeWy = 0;
        let sizeWz = 0;

        let sizeHx = 0;
        let sizeHy = sizeY;
        let sizeHz = 0;

        let sizeDx = 0;
        let sizeDy = 0;
        let sizeDz = sizeZ;

        setCenter((prevState) => ({ ...prevState, x: centerX, y: centerY, z: centerZ }));
        setSize((prevState) => ({ ...prevState, x: sizeWx, y: sizeHy, z: sizeDz }));
        setSizeW((prevState) => ({ ...prevState, x: sizeWx, y: sizeWy, z: sizeWz }));
        setSizeH((prevState) => ({ ...prevState, x: sizeHx, y: sizeHy, z: sizeHz }));
        setSizeD((prevState) => ({ ...prevState, x: sizeDx, y: sizeDy, z: sizeDz }));

        viewerRef.current.addBox({center:{x:centerX,y:centerY,z:centerZ},
          dimensions:  {'w': {'x':sizeWx, 'y':sizeWy, 'z':sizeWz}, 
                        'h': {'x':sizeHx, 'y':sizeHy, 'z':sizeHz},  
                        'd': {'x':sizeDx, 'y':sizeDy, 'z':sizeDz}}, 
          color:'yellow', 
          opacity: 0.8              
          });

          viewerRef.current.render();
      });
    }
  }, []);
  
  

  useEffect(() => {
    if (viewerRef.current) {
      updateModel();
    }
    
  }, [viewerRef.current, center, sizeW, sizeH, sizeD]);

  const updateModel = () => {
    viewerRef.current.removeAllShapes();
    viewerRef.current.addBox({
      center: { x: center.x, y: center.y, z: center.z },
      dimensions: {
        'w': { 'x': sizeW.x, 'y': sizeW.y, 'z': sizeW.z },
        'h': { 'x': sizeH.x, 'y': sizeH.y, 'z': sizeH.z },
        'd': { 'x': sizeD.x, 'y': sizeD.y, 'z': sizeD.z }
      },
      color: 'yellow',
      opacity: 0.8 
    });
  
    viewerRef.current.render();
  }  

  const handleInputChange = (field, value) => {
    if (value === '') {
      value = '0';
    }

    var axisX = new $3Dmol.Vector3(1,0,0);   // X 轴
    var xDegree = rotation.x;
    var radianX = (Math.PI * xDegree) / 180;

    var axisY = new $3Dmol.Vector3(0,1,0);   // Y 轴
    var yDegree = rotation.y;
    var radianY = (Math.PI * yDegree) / 180;

    var axisZ = new $3Dmol.Vector3(0,0,1);   // Z 轴
    var zDegree = rotation.z;
    var radianZ = (Math.PI * zDegree) / 180;

    var vecW = new $3Dmol.Vector3(size.x, 0, 0);
    var vecH = new $3Dmol.Vector3(0, size.y, 0);
    var vecD = new $3Dmol.Vector3(0, 0, size.z);

    const parsedValue = parseFloat(value);
    switch (field) {
      case 'centerX':
        setCenter((prevState) => ({ ...prevState, x: parsedValue }));
        break;
      case 'centerY':
        setCenter((prevState) => ({ ...prevState, y: parsedValue }));
        break;
      case 'centerZ':
        setCenter((prevState) => ({ ...prevState, z: parsedValue }));
        break;
      case 'sizeX':
        setSize((prevState) => ({ ...prevState, x: parsedValue }));
        vecW = new $3Dmol.Vector3(parsedValue,0,0);
        vecW.rotateAboutVector(axisX,radianX);
        vecW.rotateAboutVector(axisY,radianY);
        vecW.rotateAboutVector(axisZ,radianZ);
        setSizeW((prevState) => ({ ...prevState, x: vecW.x, y: vecW.y, z: vecW.z }));
        break;
      case 'sizeY':
        setSize((prevState) => ({ ...prevState, y: parsedValue }));                            
        vecH = new $3Dmol.Vector3(0,parsedValue,0);
        vecH.rotateAboutVector(axisX,radianX);
        vecH.rotateAboutVector(axisY,radianY);
        vecH.rotateAboutVector(axisZ,radianZ);
        setSizeH((prevState) => ({ ...prevState, x: vecH.x, y: vecH.y, z: vecH.z }));
        break;
      case 'sizeZ':
        setSize((prevState) => ({ ...prevState, z: parsedValue }));
        vecD = new $3Dmol.Vector3(0, 0, parsedValue);
        vecD.rotateAboutVector(axisX,radianX);
        vecD.rotateAboutVector(axisY,radianY);
        vecD.rotateAboutVector(axisZ,radianZ);
        setSizeD((prevState) => ({ ...prevState, x: vecD.x, y: vecD.y, z: vecD.z }));
        break;
      case 'rotateX':
        setRotation((prevState) => ({ ...prevState, x: parsedValue }));
        yDegree = rotation.y;
        xDegree = parsedValue;
        zDegree = rotation.z;
        radianX = (Math.PI * xDegree) / 180;
        radianY = (Math.PI * yDegree) / 180;
        radianZ = (Math.PI * zDegree) / 180;
        break;
      case 'rotateY':
        setRotation((prevState) => ({ ...prevState, y: parsedValue }));
        xDegree = rotation.x;
        yDegree = parsedValue;
        zDegree = rotation.z;
        radianX = (Math.PI * xDegree) / 180;
        radianY = (Math.PI * yDegree) / 180;
        radianZ = (Math.PI * zDegree) / 180;
        break;
      case 'rotateZ':
        setRotation((prevState) => ({ ...prevState, z: parsedValue }));
        xDegree = rotation.x;
        yDegree = rotation.y;
        zDegree = parsedValue;
        radianX = (Math.PI * xDegree) / 180;
        radianY = (Math.PI * yDegree) / 180;
        radianZ = (Math.PI * zDegree) / 180;
        break;
      default:
        break;
    }

    vecW.rotateAboutVector(axisX,radianX);
    vecW.rotateAboutVector(axisY,radianY);
    vecW.rotateAboutVector(axisZ,radianZ);
    setSizeW((prevState) => ({ ...prevState, x: vecW.x, y: vecW.y, z: vecW.z }));

    vecH.rotateAboutVector(axisX,radianX);
    vecH.rotateAboutVector(axisY,radianY);
    vecH.rotateAboutVector(axisZ,radianZ);
    setSizeH((prevState) => ({ ...prevState, x: vecH.x, y: vecH.y, z: vecH.z }));

    vecD.rotateAboutVector(axisX,radianX);
    vecD.rotateAboutVector(axisY,radianY);
    vecD.rotateAboutVector(axisZ,radianZ);
    setSizeD((prevState) => ({ ...prevState, x: vecD.x, y: vecD.y, z: vecD.z }));

  };
  
  return (
    <div className="smdocking-container">
   
      <p>这是一个3dmol例子, 一般人应该用不到</p>
      <div className="protein-container">
        <div className="display-box" id="protein-box" ref={containerRef}></div>
        <div className="control-form">
          <div className="form-group" style={{ marginLeft: '20px', marginTop: '10px', padding: '1rem 1rem 1rem 1rem' }}>
            <div>
              <span className="form-font" style={{ textAlign: 'center', marginLeft: '30%', marginTop: '20px', backgroundColor: 'transparent' }}>Center</span>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>X:</span>
                <input
                  className="slider-input"
                  name="centerXRange"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={center.x}
                  onChange={(e) => handleInputChange('centerX', e.target.value)}
                />
                <input
                  name="centerX"
                  className="form-input"
                  placeholder=""
                  type="number"
                  step="0.1"
                  value={center.x}
                  onChange={(e) => handleInputChange('centerX', e.target.value)}
                />
              </form>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>Y:</span>
                <input
                  className="slider-input"
                  name="CenterYRange"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={center.y}
                  onInput={(e) => handleInputChange('centerY', e.target.value)}
                />
                <input
                  name="CenterY"
                  className="form-input"
                  placeholder=""
                  type="number"
                  value={center.y}
                  step="0.1"
                  onInput={(e) => handleInputChange('centerY', e.target.value)}
                />
              </form>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>Z:</span>
                <input
                  className="slider-input"
                  name="CenterZRange"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={center.z}
                  onInput={(e) => handleInputChange('centerZ', e.target.value)}
                />
                <input
                  name="CenterZ"
                  className="form-input"
                  placeholder=""
                  type="number"
                  step="0.1"
                  value={center.z}
                  onInput={(e) => handleInputChange('centerZ', e.target.value)}
                />
              </form>
            </div>
            <div>
              <span className="form-font" style={{ textAlign: 'center', marginLeft: '30%', backgroundColor: 'transparent' }}>Size</span>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>X:</span>
                <input
                  name="SizeXRange"
                  className="slider-input"
                  type="range"
                  min="0"
                  max="100"
                  value={size.x}
                  step="1"
                  onInput={(e) => handleInputChange('sizeX', e.target.value)}
                />
                <input
                  name="SizeX"
                  className="form-input"
                  placeholder=""
                  pattern="\d*"
                  value={size.x}
                  type="number"
                  onInput={(e) => handleInputChange('sizeX', e.target.value)}
                />
              </form>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>Y:</span>
                <input
                  name="SizeYRange"
                  className="slider-input"
                  type="range"
                  min="0"
                  max="100"
                  value={size.y}
                  step="1"
                  onInput={(e) => handleInputChange('sizeY', e.target.value)}
                />
                <input
                  name="SizeY"
                  className="form-input"
                  placeholder=""
                  pattern="\d*"
                  value={size.y}
                  type="number"
                  onInput={(e) => handleInputChange('sizeY', e.target.value)}
                />
              </form>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>Z:</span>
                <input
                  name="SizeZRange"
                  className="slider-input"
                  type="range"
                  min="0"
                  max="100"
                  value={size.z}
                  step="1"
                  onInput={(e) => handleInputChange('sizeZ', e.target.value)}
                />
                <input
                  name="SizeZ"
                  className="form-input"
                  placeholder=""
                  pattern="\d*"
                  value={size.z}
                  type="number"
                  onInput={(e) => handleInputChange('sizeZ', e.target.value)}
                />
              </form>
            </div>
            <div>
              <span className="form-font" style={{ textAlign: 'center', marginLeft: '30%', backgroundColor: 'transparent' }}>Rotate</span>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>X:</span>
                <input
                  name="RotateXRange"
                  className="slider-input"
                  type="range"
                  min="0"
                  max="360"
                  value={rotation.x}
                  step="1"
                  onInput={(e) => handleInputChange('rotateX', e.target.value)}
                />
                <input
                  name="RotateX"
                  className="form-input"
                  placeholder=""
                  pattern="\d*"
                  value={rotation.x}
                  type="number"
                  onInput={(e) => handleInputChange('rotateX', e.target.value)}
                />
              </form>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>Y:</span>
                <input
                  name="RotateYRange"
                  className="slider-input"
                  type="range"
                  min="0"
                  max="360"
                  value={rotation.y}
                  step="1"
                  onInput={(e) => handleInputChange('rotateY', e.target.value)}
                />
                <input
                  name="RotateY"
                  className="form-input"
                  placeholder=""
                  pattern="\d*"
                  value={rotation.y}
                  type="number"
                  onInput={(e) => handleInputChange('rotateY', e.target.value)}
                />
              </form>
              <form className="form-unit">
                <span className="slider-label" style={{ backgroundColor: 'transparent' }}>Z:</span>
                <input
                  name="RotateZRange"
                  className="slider-input"
                  type="range"
                  min="0"
                  max="360"
                  value={rotation.z}
                  step="1"
                  onInput={(e) => handleInputChange('rotateZ', e.target.value)}
                />
                <input
                  name="RotateZ"
                  className="form-input"
                  placeholder=""
                  pattern="\d*"
                  value={rotation.z}
                  type="number"
                  onInput={(e) => handleInputChange('rotateZ', e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreedmolDemo;

                

