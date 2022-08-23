import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../../screens/home';
import Category from '../../screens/category';
import MyPage from '../../screens/myPage';
import Search from '../../screens/search';
import CategoryFill from '../../assets/images/category_fill.svg';
import CategoryOutline from '../../assets/images/category_outline.svg';
import HomeFill from '../../assets/images/home_fill.svg';
import HomeOutline from '../../assets/images/home_outline.svg';
import SearchFill from '../../assets/images/search_fill.svg';
import SearchOutline from '../../assets/images/search_outline.svg';
import UserOutline from '../../assets/images/user_outline.svg';
import Cart from '../../assets/images/cart.svg';
import Place from '../../assets/images/place.svg';
import Kurly from '../../assets/images/kurly.svg';
import theme from '../../styles/theme';
import styled from '@emotion/native';

const BottomNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: theme.color.primary,
          height: 44,
        },
        headerTitleStyle: {
          fontSize: theme.font.size.small,
          fontWeight: theme.font.weight.bold,
          color: theme.color.white,
        },
        headerRight: () => {
          return (
            <HeaderRight>
              <PlaceIcon />
              <Cart />
            </HeaderRight>
          );
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: props => (props.focused ? <HomeFill /> : <HomeOutline />),
          headerTitleStyle: {
            fontSize: 0,
          },
          headerLeft: () => {
            return <KurlyIcon />;
          },
        }}
      />

      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          tabBarIcon: props =>
            props.focused ? <CategoryFill /> : <CategoryOutline />,
          headerTitle: '카테고리',
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: props =>
            props.focused ? <SearchFill /> : <SearchOutline />,
          headerTitle: '검색',
        }}
      />

      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarIcon: () => <UserOutline />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const HeaderRight = styled.View`
  display: flex;
  flex-direction: row;
  margin-right: 16px;
`;

const PlaceIcon = styled(Place)`
  margin-right: 12px;
`;

const KurlyIcon = styled(Kurly)`
  margin-left: 14px;
`;
