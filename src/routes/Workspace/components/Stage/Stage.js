import React from 'react';
import THREE from 'three';
import registerExtras from 'three-orbit-controls';
import classes from './Stage.scss';
import { 
  Renderer, 
  Scene, 
  PerspectiveCamera,
  AxisHelper,
  Line
} from 'react-three';

const OrbitControls = registerExtras(THREE);

class Stage extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    points: React.PropTypes.array
  };

  render() {
    const { width, height, points } = this.props;

    const cameraProps = {
      fov: 75,
      aspect: width / height,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(0, 0, 600),
      lookat: new THREE.Vector3(0, 0, 0)
    };

    const material = new THREE.LineDashedMaterial({
      linewidth: 3,
      vertexColors: THREE.VertexColors
    });

    const geometry = new THREE.Geometry();
    geometry.vertices = points.map((point) => {
      return point.position;
    });

    geometry.colors = points.map((point) => {
      return point.color;
    });

    return (
      <Renderer width={width} height={height}>
        <Scene width={width} 
               height={height} 
               camera="camera" 
               orbitControls={OrbitControls}>
          <PerspectiveCamera name="camera" {...cameraProps} />
          <AxisHelper size={20} />
          <Line geometry={geometry} material={material} mode={THREE.LinePieces}/>
        </Scene>
      </Renderer>
    );
  }
}

export default Stage;
