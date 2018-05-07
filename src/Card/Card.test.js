import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Card from './Card.js';

describe('Card', () => {
  let card;
  const mockData = { 
    location: "Colorado", 
    stats: { "2007": 0.013}
  };
 
  const mockCards = [
    {district: {location: "COLORADO", stats: { "2007": 0.013}}}];
 
  beforeEach(() => {
    card = shallow(< Card 
      district={ mockData }
      updateCompareState={ jest.fn() }
      comparedCards = {mockCards} />);
  });

    it('should match the snapshot', () => {
      expect(card).toMatchSnapshot();
    });

   it('should render a card with output from the  location props that it was passed', () => {
     const expectation = 'Colorado';

     expect(card.find('h3').text()).toBe(expectation);
    });

   it('should render a card with output from the stats props that it was passed', () => {
     const expectation = ' 2007: 0.013 ';

     expect(card.find('ul').childAt(0).text()).toBe(expectation);
    });

    it('should call handleCardClick when the card is clicked', () => {
      card = mount(< Card 
        district={ mockData }
        updateCompareState={ jest.fn() }
        comparedCards = { mockCards } />);
      const spy = spyOn(card.instance(), 'handleCardClick')
      card.instance().forceUpdate();

      card.find('div').simulate('click');

      expect(spy).toHaveBeenCalled();
      
    });

    it('should update clicked state to opposite boolean when handleCardClick is called', () => {
      card.setState({clicked: false})

      card.instance().handleCardClick();

      expect(card.state('clicked')).toBe(true);
    });

    it.skip('should call updateCompareState method from App component when handleCardClick is called', () => {
      card = mount(< Card 
        district={ mockData }
        updateCompareState={ jest.fn() }
        comparedCards = { mockCards } />);
      const spy = spyOn(card.instance(), 'updateCompareState')
      
      card.instance().forceUpdate();

      card.find('div').simulate('click');

      expect(spy).toHaveBeenCalled();
    });
});


 
