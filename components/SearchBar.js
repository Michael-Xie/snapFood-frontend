import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Searchbar, List, Card, Chip } from 'react-native-paper';
import { t } from 'react-native-tailwindcss';

const MAX_RESULTS_DISPLAYED = 5;

function SearchBar({
  searcher,
  latitude,
  longitude,
  radius,
  activeTags,
  setActiveTags,
  style = [],
  showRefineDialog,
  type,
  errMsg,
}) {
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeSearch = (query) => {
    setSearchTerm(query);
  };

  const loadData = async () => {
    const apiData = await fetch(
      `https://glacial-cove-31720.herokuapp.com/tags?latitude=${latitude}&longitude=${longitude}&radius=${radius}&searcher=${searcher}`
    );
    const responseText = await apiData.text();
    const { tags } = JSON.parse(responseText);
    setSearchSuggestions(tags || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const matchTags = (tag) => {
    try {
      const re = new RegExp(`^${searchTerm}`, 'i');
      return tag.match(re) && !activeTags.includes(tag);
    } catch {
      return false;
    }
  };

  const handleItemPress = (text) => {
    setSearchTerm('');
    setActiveTags((prev) => [...prev, text]);
  };

  const handleSearchPress = () => {
    if (!searchTerm) {
      return;
    }
    setActiveTags((prev) => [...prev, searchTerm]);
    setSearchTerm('');
  };

  const searching = searchTerm.length > 0;
  // If searching but no suggestions match, show no suggestions message to user
  const showNoSuggestions = searching && searchSuggestions.filter(matchTags).length === 0;

  return (
    <>
      {type ? (
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchTerm}
          style={[t.z10, searchTerm.length > 0 ? t.roundedBNone : '', ...style]}
          onIconPress={handleSearchPress}
          icon="plus"
        />
      ) : (
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchTerm}
          style={[t.z10, searchTerm.length > 0 ? t.roundedBNone : '', ...style]}
          onSubmitEditing={handleSearchPress}
          onIconPress={showRefineDialog}
          icon="playlist-edit"
        />
      )}
      {searching &&
        (showNoSuggestions ? (
          <List.Item title={errMsg} />
        ) : (
          <Card style={[t.roundedTNone, t.z10]}>
            <List.Section>
              {searchSuggestions.filter(matchTags).map(
                (text, i) =>
                  // Only show top x results (currently set to 5)
                  i < MAX_RESULTS_DISPLAYED && (
                    <List.Item title={text} key={text} onPress={() => handleItemPress(text)} />
                  )
              )}
            </List.Section>
          </Card>
        ))}
      <Card style={t.z10}>
        <View style={[t.flexRow, t.flexWrap]}>
          {activeTags.length > 0 &&
            activeTags.map((tag) => (
              <Chip
                onClose={() =>
                  setActiveTags((prev) => prev.filter((activeTag) => activeTag !== tag))
                }
                style={[t.flexGrow0, t.flexWrap, t.m1]}
                key={tag}
              >
                {tag}
              </Chip>
            ))}
        </View>
      </Card>
    </>
  );
}

export default SearchBar;
