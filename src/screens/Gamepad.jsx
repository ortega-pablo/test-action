import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SVGBackground from '../components/Background';
import ArrowCircle from '../components/Joystick/ArrowCircle';
import Joystick from '../components/Joystick/Joystick';
import RobotsDropdown from '../components/Joystick/RobotsDropdown';
import RobotStatus from '../components/RobotStatus';
import StopButton from '../components/Joystick/StopButton';
import PauseButton from '../components/Joystick/PauseButton';
import GamepadBar from '../components/Joystick/GamepadBar';
import TestStatusModal from '../components/Joystick/TestStatusModal';
import ShotCounter from '../components/Joystick/ShotsCounter';
import {useDispatch, useSelector} from 'react-redux';
import {resetHits, resetIsBeaten} from '../redux/robotStaticsSlice';

const Gamepad = () => {
  const dispatch = useDispatch();

  const {signal} = useSelector(state => state.robotStatics);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // eslint-disable-next-line no-unused-vars
  const [joysticks, setJoysticks] = useState({
    left: {x: 0, y: 0},
    right: {x: 0, y: 0},
  });

  const handleMove = (id, position) => {
    // eslint-disable-next-line no-shadow
    setJoysticks(joysticks => ({...joysticks, [id]: position}));
  };

  const openModalStopped = () => {
    setIsRunning(false);
    setElapsedTime(elapsedTime);
    setStatus('stopped');
    setModalVisible(true);
  };

  const openModalPaused = () => {
    setIsRunning(false);
    setElapsedTime(elapsedTime);
    setStatus('paused');
    setModalVisible(true);
  };
  useEffect(() => {
    dispatch(resetIsBeaten());
    dispatch(resetHits());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SVGBackground>
      <View style={styles.pageContainer}>
        <View style={styles.statusBarContainer}>
          <View style={styles.statusBarCenter}>
            <GamepadBar
              elapsedTime={elapsedTime}
              setElapsedTime={setElapsedTime}
              setIsRunning={setIsRunning}
              isRunning={isRunning}
            />
          </View>
          <View style={styles.statusBarRight}>
            <RobotStatus signal={signal} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.leftColumn}>
            <StopButton onPress={openModalStopped} />
            <View style={styles.buttonsContainer}>
              <PauseButton
                type={'pause'}
                customStyle={styles.pauseButton}
                setModalVisible={setModalVisible}
                onPress={openModalPaused}
              />
              <PauseButton type={'bulb'} customStyle={styles.lighbulbButton} />
            </View>
          </View>
          <View style={styles.centerColumn}>
            <RobotsDropdown />
            <ArrowCircle />
            <ShotCounter />
          </View>
          <View style={styles.rightColumn}>
            <Joystick id="right" onMove={handleMove} />
          </View>
        </View>
      </View>
      <TestStatusModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        status={status}
        elapsedTime={elapsedTime}
        setIsRunning={setIsRunning}
      />
    </SVGBackground>
  );
};

const styles = StyleSheet.create({
  centerColumn: {
    width: '50%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  robotBox: {
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{translateX: -164}],
  },
  rightColumn: {
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 72,
  },
  leftColumn: {
    width: '25%',
    paddingBottom: 72,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBarContainer: {
    height: '10%',
    paddingVertical: 24,
    paddingHorizontal: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBarLeft: {
    flex: 1,
  },
  statusBarCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 7.5,
  },
  statusBarRight: {
    justifyContent: 'center',
    flex: 2.5,
  },
  contentContainer: {
    flexDirection: 'row',
    height: '90%',
  },
  pageContainer: {
    flex: 1,
  },
  buttonsContainer: {
    position: 'relative',
    width: 200,
    height: 150,
  },
  pauseButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  lighbulbButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default Gamepad;
