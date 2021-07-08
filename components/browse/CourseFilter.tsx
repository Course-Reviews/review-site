import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Col from '../atom/Col';
import Dropdown from '../atom/Dropdown';
import FormGroup from '../atom/FormGroup';
import Row from '../atom/Row';
import {Option} from '../atom/Dropdown';
import filter from '../../pages/api/courses/filter';
import { TERMS, FACULTYS } from '../../types/config';
import Button from '../atom/Button';
import Input from '../atom/Input';

const stages: Option[] = [
  { label: 'Any', value: undefined },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
];

const terms: Option[] = [
  { label: 'Any', value: undefined },
  ...TERMS.map((t, i) => ({
    label: t,
    value: i,
  })).sort((a, b) => `${a.label}`.localeCompare(b.label)),
];

const faculties: Option[] = [
  { label: 'Any', value: undefined },
  ...FACULTYS.map((f, i) => ({
    label: f,
    value: i,
  })),
];


interface CourseFilterProps {
  defaultValues?: FormFields;
  onSubmit: (data: FormFields) => void;
}

interface FormFields {
  stage?: number;
  term?: number;
  faculty?: number;
  query?: string;
}

const formFields = {
  stage: 'stage',
  term: 'term',
  faculty: 'faculty',
  query: 'query',
} as const;

const CourseFilter: React.FC<CourseFilterProps> = ({defaultValues, onSubmit}) => {

  const {handleSubmit, register, control, reset} = useForm<FormFields>({
    defaultValues: defaultValues,
  });

  const handleValidSubmit: SubmitHandler<FormFields> = (data) => {
    onSubmit({
      ...data,
      query: data.query === '' ? undefined : data.query
    });
  }

  const handleClear = () => {
    reset({});
    onSubmit({});
  }

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      <Row className={'border-b pb-4 pt-2 items-end flex-wrap'}>
        <Col className={'w-full md:w-32'}>
          <FormGroup label='Stage'>
            <Dropdown
              options={stages}
              control={control}
              name={formFields.stage}
            >
              Stage
            </Dropdown>
          </FormGroup>
        </Col>
        <Col className={'w-full md:w-56'}>
          <FormGroup label='Term'>
            <Dropdown
              options={terms}
              control={control}
              name={formFields.term}
            >
              Term
            </Dropdown>
          </FormGroup>
        </Col>
        <Col className={'w-full md:w-64'}>
          <FormGroup label='Faculty'>
            <Dropdown
              options={faculties}
              control={control}
              name={formFields.faculty}
            >
              Term
            </Dropdown>
          </FormGroup>
        </Col>
        <Col className={'w-full md:w-64'}>
          <FormGroup label='Search'>
            <Input
              {...register(formFields.query)}
            />
          </FormGroup>
        </Col>
        <Col className={'w-full md:w-auto'}>
          <FormGroup>
            <Row>
              <Col>
                <Button outline block type='button' onClick={handleClear}>
                  Clear Filters
                </Button>
              </Col>
              <Col>
                <Button block>
                  Apply Filter
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Col>
      </Row>
    </form>
  );
};

export default CourseFilter;
