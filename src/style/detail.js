import { StyleSheet, Dimensions } from 'react-native';
import { MAIN_COLOR, MAIN_COLOR_2, SECONDARY_COLOR, BACKGROUND_COLOR } from '../setting';

const circleBgWidth = Dimensions.get('window').width * 1.5;
const halfWidth = Dimensions.get('window').width * 0.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  circleBg: {
    position: 'absolute',
    left: 0.1 * circleBgWidth,
    top: - 0.4 * circleBgWidth,
    width:  circleBgWidth,
    height: circleBgWidth,
    borderBottomStartRadius:  circleBgWidth * 0.6,
    borderBottomEndRadius: circleBgWidth * 0.6,
    borderTopStartRadius:  circleBgWidth * 0.6,
    borderTopEndRadius: circleBgWidth * 0.6,
    backgroundColor: BACKGROUND_COLOR,
  },
  topContent: {
    marginTop: 120,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  nameBlock: {
    minWidth: 200,
    maxWidth: 230,
    marginLeft: 50,
    marginRight: 20,
  },
  name: {
    color: SECONDARY_COLOR,
    fontSize: 30,
  },
  enNameBlock: {
    marginLeft: 50,
    marginRight: 20,
    marginVertical: 20,
    minWidth: 200,
    maxWidth: 230,
  },
  enName: {
    paddingLeft: 15,
    color: MAIN_COLOR
  },
  descriptionBlock: {
    marginHorizontal: 30,
    marginVertical: 20
  },
  description: {
    color: 'gray',
    lineHeight: 24
  },
  nutrientBoard: {
    marginTop: 20,
    marginHorizontal: 10
  },
  nutrientOuterBlock: {
    width: halfWidth - 10,
    borderRadius: 30,
    borderColor: '#34656d',
    padding: 10
  },
  nutrientBlock: {
    minHeight: 180,
    padding: 15,
    // backgroundColor: BACKGROUND_COLOR,
    backgroundColor: 'white',
    borderColor: '#ffc93c',
    borderWidth: 2,
    borderRadius: 30,
    
  },
  nutrientTitleText: {
    color: '#34656d',
    marginBottom: 10
  },
  nutrientList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientListText: {
    display: 'flex',
    flexDirection: 'row',
  },
  nutrientName: {
    lineHeight: 20,
    fontSize: 12,
    color: '#334443'
  },
  valueText: {
    color: '#99154e'
  },
  unitText: {
    lineHeight: 16,
    fontSize: 10,
    color: MAIN_COLOR
  }
})