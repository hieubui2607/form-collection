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
  Form
} from '@shopify/polaris';

const App = () => {
  const [data, setData] = useState({
    title: '',
    description: '',
    collection_type: 'manual',
    conditions: [
      {
        conditions_product: 'all collections',
        product_tag: "1",
        equal: "1",
        number: 1
      }
    ]
  },)

  const onSubmit = () => {
    console.log(data)
  }

  const optionProduct = [
    { key: '0a', label: 'option1', value: "1" },
    { key: '1a', label: 'option2', value: "2" },
    { key: '2a', label: 'option3', value: "3" },
  ];

  const optionEqual = [
    { key: '0b', label: 'option1', value: "1" },
    { key: '1b', label: 'option2', value: "2" },
    { key: '2b', label: 'option3', value: "3" },
  ];

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
                name="conditions_product"
                checked={data.conditions[0].conditions_product === "all collections"}
                onChange={value => value ?
                  setData({ ...data, conditions: [{ ...data.conditions[0], conditions_product: "all collections" }] }) : null
                }
              />
              <RadioButton
                label="any condition"
                name="conditions_product"
                checked={data?.conditions[0]?.conditions_product === "any collection"}
                onChange={value => value ?
                  setData({ ...data, conditions: [{ ...data.conditions[0], conditions_product: "any collection" }] }) : null}
              />
            </Inline>
          </Stack>
          <Columns columns={{ xs: '1fr 1fr 1fr' }} gap='4'>
            <Select
              options={optionProduct}
              name='product_tag'
              value={data.conditions[0].product_tag}
              onChange={value => setData({ ...data, conditions: [{ ...data.conditions[0], product_tag: value }] })}
            />
            <Select
              options={optionEqual}
              name='equal'
              value={data.conditions[0].equal}
              onChange={value => setData({ ...data, conditions: [{ ...data.conditions[0], equal: value }] })}
            />
            <TextField
              type="number"
              value={data.conditions[0].number}
              autoComplete="off"
              onChange={value => setData({ ...data, conditions: [{ ...data.conditions[0], number: Number(value) }] })}
            />
          </Columns>
          <div style={{ paddingTop: '20px' }}>
            <Button submit type='submit'>Add another condition</Button>
          </div>
        </LegacyCard>
      </Form>
    </Page >
  )
}

export default App;
