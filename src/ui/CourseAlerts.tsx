import {Notice} from 'open-polito-api/course';
import React, {ReactElement, useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import styles from '../styles';
import NoContent from '../components/NoContent';
import Notification from './Notification';
import {NotificationType} from 'open-polito-api/notifications';
import {p} from '../scaling';

const CourseAlerts = ({
  alerts,
  dark,
  refreshControl,
}: {
  alerts: Notice[];
  dark: boolean;
  refreshControl: ReactElement;
}) => {
  const _styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        paddingHorizontal: 16 * p,
        flex: 1,
      },
    });
  }, [dark]);

  return (
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
      }}>
      <FlatList
        style={_styles.container}
        ListEmptyComponent={<NoContent />}
        ListHeaderComponent={() => <View style={{height: 24 * p}} />}
        refreshControl={refreshControl}
        data={alerts}
        keyExtractor={alert => alert.date + alert.text.slice(0, 30)}
        renderItem={a => (
          <View style={{marginBottom: 24 * p}}>
            <Notification
              type={NotificationType.NOTICE}
              notification={a.item}
              dark={dark}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CourseAlerts;