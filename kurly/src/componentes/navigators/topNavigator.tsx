import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import theme from '../../styles/theme';
import Best from '../home/best';
import New from '../home/new';
import Recommend from '../home/recommend';
import Shopping from '../home/shopping';
import Special from '../home/special';

const TopNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 36,
        },
        tabBarLabelStyle: {
          fontSize: theme.font.size.xSmall,
          fontWeight: theme.font.weight.bold,
          top: -6,
        },
        tabBarIndicatorStyle: {
          backgroundColor: theme.color.primary,
        },
        tabBarActiveTintColor: theme.color.primary,
        tabBarInactiveTintColor: theme.color.grayscale30,
      }}>
      <Tab.Screen
        name="Recommend"
        component={Recommend}
        options={{
          title: '컬리추천',
        }}
      />

      <Tab.Screen
        name="New"
        component={New}
        options={{
          title: '신상품',
        }}
      />

      <Tab.Screen
        name="Best"
        component={Best}
        options={{
          title: '베스트',
        }}
      />

      <Tab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: '알뜰쇼핑',
        }}
      />

      <Tab.Screen
        name="Special"
        component={Special}
        options={{
          title: '특가/혜택',
        }}
      />
    </Tab.Navigator>
  );
};

export default TopNavigator;
