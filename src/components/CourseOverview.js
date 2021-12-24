import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import styles from '../styles';
import AlertWidget from './AlertWidget';
import CourseInfo from './CourseInfo';
import CourseVideos from './CourseVideos';
import LiveWidget from './LiveWidget';
import MaterialWidget from './MaterialWidget';
import TextWidget from './TextWidget';

export default function CourseOverview({courseData, changeTab}) {
  const {t} = useTranslation();

  const [offsetY, setOffsetY] = useState(0);

  return (
    <ScrollView
      onScroll={e => {
        setOffsetY(e.nativeEvent.contentOffset.y);
      }}
      contentContainerStyle={{
        ...styles.withHorizontalPadding,
        paddingBottom: offsetY == 0 ? 32 : 16,
      }}>
      {courseData.live_lessons.map(
        liveClass =>
          liveClass.running && (
            <LiveWidget
              key={liveClass.meeting_id}
              liveClass={liveClass}
              courseName={courseData.nome}
              device={courseData.device}
            />
          ),
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <MaterialWidget
          courseCode={courseData.codice + courseData.nome}
          action={() => {
            changeTab('material');
          }}
        />
        <AlertWidget
          alerts={courseData.avvisi.slice(0, 3)}
          action={() => {
            changeTab('alerts');
          }}
        />
      </View>
      <TextWidget icon="information-outline" name={t('courseInfo')} expandable>
        <CourseInfo data={courseData.info} />
      </TextWidget>
      {/* <TextWidget name={t('oldVideos')} expandable>
        <CourseVideos videos={courseData.videolezioni} />
      </TextWidget> */}
    </ScrollView>
  );
}