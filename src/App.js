import { useState } from 'react';
import {
  Page,
  LegacyCard,
  FormLayout,
  TextField,
  Button,
  Text,
  RadioButton,
  Stack, Inline,
  Select,
  Columns,
  Form,
  Icon
} from '@shopify/polaris';
import {
  CircleCancelMajor
} from '@shopify/polaris-icons';

const App = () => {
  const [showCondition, setShowCondition] = useState(true)
  const [data, setData] = useState({
    title: '',
    description: '',
    collection_type: 'manual',
    conditions: [
      {
        product_tag: "1",
        equal: "1",
        number: 1
      }
    ]
  },)

  const onSubmit = () => {
    console.log(data)
  }

  const option = [
    { key: '0a', label: 'option1', value: "1" },
    { key: '1a', label: 'option2', value: "2" },
    { key: '2a', label: 'option3', value: "3" },
  ];

  const handleConditionAdd = () => {
    setData({
      ...data, conditions: [...data.conditions, {
        product_tag: "1",
        equal: "1",
        number: 1
      }]
    })
  }

  const handleConditionRemove = (i) => {
    const list = { ...data, conditions: [...data.conditions] }
    if (data.conditions.length <= 1) {
      return
    }
    list.conditions.splice(i, 1)
    setData(list)
  }

  const handleAnyCondition = () => {
    const list = { ...data, conditions: [] }
    setShowCondition(false)
    setData(list)
  }

  const handleAllCondition = () => {
    const list = {
      ...data, conditions: [{
        product_tag: "1",
        equal: "1",
        number: 1
      }]
    }
    setShowCondition(true)
    setData(list)
  }

  return (
    <Page
      breadcrumbs={[{ content: "form", url: '/' }]}
      title="Create collection"
    >
      <Form onSubmit={onSubmit}>
        <LegacyCard sectioned>
          <FormLayout>
            <TextField
              type='text'
              id='title'
              label={<Text variant="headingMd" as="h2">Title</Text>}
              placeholder="e.g. Summer collection, Under $100, Staff picks"
              value={data.title}
              onChange={value => setData({ ...data, title: value })}
            />
            <TextField
              label={<Text variant="headingMd" as="h2">Description</Text>}
              type="text"
              id='description'
              multiline={6}
              autoComplete="off"
              value={data.description}
              onChange={value => setData({ ...data, description: value })}
            />
          </FormLayout>
        </LegacyCard>
        <LegacyCard sectioned>
          <Stack vertical >
            <Text variant="headingMd" as="h2">Collection type</Text>
            <RadioButton
              label="Manual"
              helpText={<Text>Add products to this collection one by one. Learn more about <a href='/' >manual collections</a>.</Text>}
              value="manual"
              checked={data.collection_type === "manual"}
              onChange={value => value ? setData({ ...data, collection_type: 'manual' }) : null}
            />
            <RadioButton
              label="Automated"
              helpText={<Text>Existing and future products that match the conditions you set will automatically be added to this collection. Learn more about <a href='/'  >automated collections</a>.</Text>}
              value='automated'
              checked={data.collection_type === "automated"}
              onChange={value => value ? setData({ ...data, collection_type: 'automated' }) : null}
            />
          </Stack>
          <Stack vertical>
            <Text variant="headingMd" as="h2">Conditions</Text>
            <Inline gap='4'>
              <Text>Product must match: </Text>
              <RadioButton
                label="all conditions"
                name="conditions"
                checked={showCondition}
                onChange={handleAllCondition}
              />
              <RadioButton
                label="any condition"
                name="condition"
                checked={!showCondition}
                onChange={handleAnyCondition}
              />
            </Inline>
          </Stack>
          {showCondition && data.conditions.map((v, i) => (
            <div key={i} style={{ marginTop: '20px' }}>
              <Columns columns={{ xs: '4fr 4fr 4fr 0.5fr' }} gap='4'>
                <Select
                  options={option}
                  name='product_tag'
                  value={v.product_tag}
                  onChange={value => setData({ ...data, conditions: [{ ...data.conditions[i], product_tag: value }] })}
                />
                <Select
                  options={option}
                  name='equal'
                  value={v.equal}
                  onChange={value => setData({ ...data, conditions: [{ ...data.conditions[i], equal: value }] })}
                />
                <TextField
                  type="number"
                  value={v.number}
                  autoComplete="off"
                  onChange={value => setData({ ...data, conditions: [{ ...data.conditions[i], number: value }] })}
                />
                { }
                <Button type='button' onClick={() => handleConditionRemove(i)}><Icon
                  source={CircleCancelMajor}
                  color="base"
                /></Button>
              </Columns>
            </div>
          ))}
          {showCondition && <div style={{ paddingTop: '20px' }}>
            <Button type='button' onClick={handleConditionAdd} >Add another condition</Button>
          </div>}
          <div style={{ paddingTop: '20px' }}>
            <Button type='submit' submit primary>Submit</Button>
          </div>
        </LegacyCard>
      </Form>
    </Page >
  )
}

export default App;
