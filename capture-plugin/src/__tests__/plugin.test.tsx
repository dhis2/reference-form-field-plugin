import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import Plugin from '../Plugin'
import { IDataEntryPluginProps } from '../Plugin.types'
import * as generatePatientDrsId from '../lib/generatePatientDrsId'

const mockSetFieldValue = jest.fn()

const mockFieldMetadata = {
    id: '',
    name: '',
    shortName: '',
    formName: 'Patient DRS ID',
    disabled: false,
    compulsory: false,
    description: '',
    type: 'TEXT',
    optionSet: '',
    displayInForms: true,
    displayInReports: true,
    icon: '',
    unique: '',
    searchable: true,
    url: '',
}

const mockFieldsMetadata = {
    id: mockFieldMetadata,
}

const mockProps: IDataEntryPluginProps = {
    fieldsMetadata: mockFieldsMetadata,
    formSubmitted: false,
    values: {},
    errors: {},
    warnings: {},
    setContextFieldValue: () => undefined,
    setFieldValue: mockSetFieldValue,
}

afterEach(() => {
    jest.clearAllMocks()
})

describe('Patient DRS ID Generator Plugin', () => {
    test('renders with correct label and placeholder', () => {
        render(<Plugin {...mockProps} />)

        expect(screen.getByLabelText('Patient DRS ID')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('DRS-XXXXXXXX')).toBeInTheDocument()
        expect(screen.getByText('Generate ID')).toBeInTheDocument()
    })

    test('displays help text initially', () => {
        render(<Plugin {...mockProps} />)

        expect(
            screen.getByText(
                'Click "Generate ID" to create a unique patient DRS ID, or enter one manually.'
            )
        ).toBeInTheDocument()
    })

    test('generates ID with correct format when button is clicked', async () => {
        const mockId = 'DRS-A7K3M9P2'
        jest.spyOn(generatePatientDrsId, 'generatePatientDrsId').mockReturnValue(mockId)
        
        render(<Plugin {...mockProps} />)

        const generateButton = screen.getByText('Generate ID')
        await userEvent.click(generateButton)

        expect(mockSetFieldValue).toHaveBeenCalledWith({
            fieldId: 'id',
            value: mockId,
        })
        
        const input = screen.getByPlaceholderText('DRS-XXXXXXXX')
        expect(input).toHaveValue(mockId)
    })

    test('allows manual ID entry and updates field value', async () => {
        render(<Plugin {...mockProps} />)

        const mockManualId = 'DRS-11111111'
        const input = screen.getByPlaceholderText('DRS-XXXXXXXX')
        await userEvent.type(input, mockManualId)

        expect(mockSetFieldValue).toHaveBeenCalledWith({
            fieldId: 'id',
            value: mockManualId,
        })
        expect(input).toHaveValue(mockManualId)
    })

    test('warns if id field is not in fieldsMetadata', async () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn')
        const propsWithoutIdField = {
            ...mockProps,
            fieldsMetadata: {},
        }
        const mockId = 'DRS-E6Y1M3Q8'
        jest.spyOn(generatePatientDrsId, 'generatePatientDrsId').mockReturnValue(mockId)

        render(<Plugin {...propsWithoutIdField} />)

        const generateButton = screen.getByText('Generate ID')
        await userEvent.click(generateButton)

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            "No field with a plugin alias `id` has been found; the value in this field won't automatically update the form value."
        )
    })
})
