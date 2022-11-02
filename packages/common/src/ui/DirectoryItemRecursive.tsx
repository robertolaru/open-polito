import React, {useState} from 'react';
import {View} from 'react-native';
import DirectoryItem from './DirectoryItem';
import {MaterialItem} from 'open-polito-api/lib/material';

export default function DirectoryItemRecursive({
  dark,
  item,
}: {
  dark: boolean;
  item: MaterialItem;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <View>
      {item.type == 'file' ? (
        <DirectoryItem dark={dark} item={item} />
      ) : (
        <View>
          <DirectoryItem
            dark={dark}
            item={item}
            onPress={() => {
              setOpened(!opened);
            }}>
            {opened
              ? item.children.map(item => (
                  <DirectoryItemRecursive
                    dark={dark}
                    key={item.code}
                    item={item}
                  />
                ))
              : []}
          </DirectoryItem>
        </View>
      )}
    </View>
  );
}
