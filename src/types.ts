import {Notice} from 'open-polito-api/course';
import {File} from 'open-polito-api/material';

/**
 * Extends the API's File type by adding some course data
 */
export type ExtendedFile = File & {
  course_name: string;
  course_code: string;
};

/**
 * Extends the API's Notice type
 */
export type ExtendedAlert = Notice & {
  course_name: string;
  course_code: string;
};

export type DropdownItem = {
  label: string;
  value: string;
};
