import { shallowMount } from '@vue/test-utils'
import Table from '@/components/Table.vue'
import arrayData from '@/data/db.json'

describe('Testing the component Table', () => {
  let wrapper:any;
  const dataName = "data";
  const readOnly = false;
  const dataset = arrayData.recordData[arrayData.recordData.length -1].data;

  beforeEach(() => {
    wrapper = shallowMount(Table, {
    props: { dataName, readOnly, dataset }
  })
  })

  it('renders all the data received', () => {
    const inputArray = wrapper.findAll('input');
    expect(inputArray.length).toEqual(dataset.length*2); 
  })

  it('Displays correct titles in the table', () => {
    expect(wrapper.text()).toMatch('Your stocks');
    expect(wrapper.text()).toMatch('Expected (Units)');
    expect(wrapper.text()).toMatch('Real (Units)');
  })

  it("Doesn't render the nested table before hover", () => {
    expect(wrapper.text()).not.toMatch('Details of the day');
  })

  it("Display correctly the nested table on hover", async () => {
    await wrapper.find(".table_selector-nest").trigger("mouseover");
    expect(wrapper.text()).toMatch('Details of the day');
    expect(wrapper.text()).toMatch("Provider's name");
    expect(wrapper.text()).toMatch('By provider (units)');
  })

  it("Display correctly the total Stock of the day", async () => {
    await wrapper.find(".table_selector-nest").trigger("mouseover");
    expect(wrapper.text()).toMatch('Total stock for the day :');
    const dayStockNested = wrapper.find("#table_dayStock")
    expect(dataset[0].realStock.toString()).toMatch(dayStockNested.text());
  })

  it("No display of button save before modification", async () => {
    await wrapper.find("input").trigger("mouseover");
    expect(wrapper.find('#save').exists()).toBe(false)
  })

  it("Correct display of button save before modification", async () => {
    await wrapper.find("input").trigger("mouseover");
    const textInput = wrapper.find('input[type="number"]')
    await textInput.setValue('some value')
    expect(wrapper.find('#save').exists()).toBe(true)
  })
})

describe('Testing the component Table readOnly', () => {
  let wrapper:any;
  const dataName = "data";
  const readOnly = true;
  const dataset = arrayData.recordData[arrayData.recordData.length -1].data;

  beforeEach(() => {
    wrapper = shallowMount(Table, {
    props: { dataName, readOnly, dataset }
  })
  })

  it('renders all the data received', () => {
    const inputArray = wrapper.findAll('input');
    expect(inputArray.length).toEqual(dataset.length*2); 
  })

  it('Displays correct titles in the table', () => {
    expect(wrapper.text()).toMatch('Your stocks');
    expect(wrapper.text()).toMatch('Expected (Units)');
    expect(wrapper.text()).toMatch('Real (Units)');
  })

  it("Doesn't render the nested table before hover", () => {
    expect(wrapper.text()).not.toMatch('Details of the day');
  })

  it("Display correctly the nested table on hover", async () => {
    await wrapper.find(".table_selector-nest").trigger("mouseover");
    expect(wrapper.text()).toMatch('Details of the day');
    expect(wrapper.text()).toMatch("Provider's name");
    expect(wrapper.text()).toMatch('By provider (units)');
  })

  it("Display correctly the total Stock of the day", async () => {
    await wrapper.find(".table_selector-nest").trigger("mouseover");
    expect(wrapper.text()).toMatch('Total stock for the day :');
    const dayStockNested = wrapper.find("#table_dayStock")
    expect(dataset[0].realStock.toString()).toMatch(dayStockNested.text());
  })

  it("No display of button save before modification", async () => {
    await wrapper.find("input").trigger("mouseover");
    expect(wrapper.find('#save').exists()).toBe(false)
  })

  it("Correct display of button save before modification", async () => {
    await wrapper.find("input").trigger("mouseover");
    const textInput = wrapper.find('input[type="number"]')
    await textInput.setValue('some value')
    expect(wrapper.find('#save').exists()).toBe(false)
  })
})
// Above is a basic test file. In order to test every aspect of the application, a test plan should be established.
// To be contined with more time.    

