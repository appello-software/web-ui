import { Nullable } from '@appello/common';
import type { Meta } from '@storybook/react';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';

import { Icon } from '~/components';
import styles from '~/components/form/DateInput/story.module.scss';

import { DateField } from '.';

const meta = {
  title: 'Components/Form/DateField',
  component: DateField,
  tags: ['autodocs'],
} satisfies Meta<typeof DateField>;

export default meta;

const Template: React.FC = () => {
  const form = useForm({ defaultValues: { date: null } });

  return <DateField control={form.control} label="Date" name="date" />;
};

const TemplateWithRange: React.FC = () => {
  const form = useForm({ defaultValues: { date: null } });

  return <DateField control={form.control} label="Date" mode="range" name="date" />;
};

export const Standard = Template.bind({});

export const WithRange = TemplateWithRange.bind({});

export const WithRightContent: React.FC = () => {
  const form = useForm<{ date: Nullable<DateRange> }>({ defaultValues: { date: null } });

  return (
    <DateField
      control={form.control}
      iconAfterElementClassName={styles.iconAfterClassName}
      inputClassName={styles.inputClassName}
      label="Date"
      mode="range"
      name="date"
      rightElement={<Icon className={styles.rightElement} name="bell" size={16} />}
    />
  );
};
