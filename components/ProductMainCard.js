import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Colors,
  Drawer,
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import { t } from 'react-native-tailwindcss';
import ToggleButton from './ToggleButton';
import UserName from './TopBar/UserName';
import LikedCounter from './LikedCounter';

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    ...t.flex1,
  },
});
export default function ProductMainCard({ price, totalVotes, storeName, distance }) {
  const [bookmarked, setBookmarked] = React.useState(false);
  return (
    <View>
      {/* <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" /> */}

      <Card style={[t.flex, t.flexCol, t.alignCenter]}>
        {/* <ImageBackground style={styles.image} source={{ uri: 'https://picsum.photos/700' }}>
          <ToggleIcon selectedIcon="bookmark" unselectedIcon="bookmark-outline" />
        </ImageBackground> */}
        <View style={[]}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <ToggleButton
            selected={bookmarked}
            selectedIcon="bookmark"
            unselectedIcon="bookmark-outline"
            handleSelected={() => setBookmarked(!bookmarked)}
          />
        </View>
        <Card.Content style={[t.flex, t.flexRow, t.justifyBetween]}>
          <View style={[t.flex, t.flexCol]}>
            <Text>{totalVotes} likes</Text>
            <LikedCounter />
          </View>
          <View style={[t.flex, t.flexCol, t.itemsEnd]}>
            <View style={[t.flex, t.flexRow]}>
              <Text style={[t.textLg]}>${price.discounted}</Text>
              <Text style={[t.lineThrough]}>${price.regular}</Text>
            </View>
            <View style={[t.flex, t.flexRow]}>
              <Text>{storeName}</Text>
              <Text>{distance}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
