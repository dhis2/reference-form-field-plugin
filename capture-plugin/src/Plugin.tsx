import React from 'react'
import { IdField } from './IdField'
import { IDataEntryPluginProps } from './Plugin.types'
import './locales'

const PluginInner = (propsFromParent: IDataEntryPluginProps) => {
    const {
        values,
        // errors,
        // warnings,
        // formSubmitted,
        // setContextFieldValue,
        fieldsMetadata,
        setFieldValue,
    } = propsFromParent

    return <IdField setFieldValue={setFieldValue} fieldsMetadata={fieldsMetadata} values={values} />
}

export default PluginInner
