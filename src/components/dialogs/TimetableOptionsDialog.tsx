import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Configuration} from '../../defaultConfig';
import {setConfig} from '../../store/sessionSlice';
import {RootState} from '../../store/store';
import {TimetableOptionsDialogParams} from '../../types';
import SettingsItem, {SettingsItemProps} from '../SettingsItem';

const TimetableOptionsDialog = ({}: TimetableOptionsDialogParams) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const config = useSelector<RootState, Configuration>(
    state => state.session.config,
  );

  const updateTimetableConfig = (params: Configuration['timetable']) => {
    dispatch(
      setConfig({...config, timetable: {...config.timetable, ...params}}),
    );
  };

  const toggleOverlapMode = () => {
    const mode: Configuration['timetable']['overlap'] =
      config.timetable?.overlap == 'split' ? 'priority' : 'split';
    updateTimetableConfig({overlap: mode});
  };

  const timetableOptionsItems: SettingsItemProps[] = [
    {
      name: t('timetablePriority'),
      description: t('timetablePriorityDesc'),
      icon: 'priority-high',
      toggle: true,
      toggleValue: config.timetable.overlap == 'priority',
      settingsFunction: () => {
        toggleOverlapMode();
      },
    },
  ];

  return (
    <View>
      {timetableOptionsItems.map(item => (
        <SettingsItem key={item.name} {...item} />
      ))}
    </View>
  );
};

export default TimetableOptionsDialog;