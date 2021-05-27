import { StyleSheet, Dimensions } from 'react-native';
import { MAIN_COLOR, MAIN_COLOR_2, SECONDARY_COLOR, BACKGROUND_COLOR } from '../setting';

const windowWidth = Dimensions.get('window').width;
const circleBgWidth = Dimensions.get('window').width * 1.5;
const halfWidth = Dimensions.get('window').width * 0.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
    marginTop: 80,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  nameBlock: {
    minWidth: windowWidth / 2.5,
    maxWidth: windowWidth / 2,
    marginLeft: 50,
    marginRight: 20,
  },
  name: {
    color: SECONDARY_COLOR,
    fontSize: 30,
  },
  enNameBlock: {
    minWidth: windowWidth / 2.5,
    maxWidth: windowWidth / 2,
    marginLeft: 50,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10
  },
  enName: {
    paddingLeft: 15,
    color: MAIN_COLOR
  },
  descriptionBlock: {
    marginHorizontal: 30,
    marginVertical: 10
  },
  description: {
    color: 'gray',
    lineHeight: 24
  },
  listContainer: {
    marginHorizontal: 30,
    marginTop: 5, 
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  listBlock: {
    width: (windowWidth - (20 * 3)) /2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  listText: {
    color: '#334443',
    lineHeight: 20
  },
  nutrientBoard: {
    flex: 1,
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
    flexWrap: 'wrap'
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