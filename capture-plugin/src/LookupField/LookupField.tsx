import i18n from '@dhis2/d2-i18n'
import { Button, Help, Input, Label } from '@dhis2/ui'
import React, { useState, useCallback } from 'react'
import { generatePatientDrsId } from '../lib/generatePatientDrsId'
import { FieldsMetadata, SetFieldValue } from '../Plugin.types'
import classes from './LookupField.module.css'

// ! NB: This is a little custom, and not so generic
const drsIdWarning =
    "No field with a plugin alias `id` has been found; the value in this field won't automatically update the form value."

type Props = {
    setFieldValue: SetFieldValue
    fieldsMetadata: FieldsMetadata
    values: Record<string, any>
}

export const LookupField = ({
    setFieldValue,
    fieldsMetadata,
    values,
}: Props) => {
    const [patientId, setPatientId] = useState(values['id'] || '')
    const [isGenerated, setIsGenerated] = useState(!!values['id'])
    const [hasIssuedWarning, setHasIssuedWarning] = useState(false)

    const handleChange = useCallback(
        ({ value }: { value: string }) => {
            if (isGenerated) return 
            
            setPatientId(value)
            if ('id' in fieldsMetadata) {
                setFieldValue({ fieldId: 'id', value })
            } else if (!hasIssuedWarning) {
                console.warn(drsIdWarning)
                setHasIssuedWarning(true)
            }
        },
        [setFieldValue, fieldsMetadata, isGenerated, hasIssuedWarning]
    )

    const handleGenerateId = useCallback(() => {
        if (isGenerated) return
        
        const newId = generatePatientDrsId()
        setPatientId(newId)
        setIsGenerated(true)
        
        if ('id' in fieldsMetadata) {
            setFieldValue({ fieldId: 'id', value: newId })
        } else if (!hasIssuedWarning) {
            console.warn(drsIdWarning)
            setHasIssuedWarning(true)
        }
    }, [setFieldValue, fieldsMetadata, isGenerated, hasIssuedWarning])

    return (
        <div className={classes.fieldContainer}>
            <div className={classes.labelContainer}>
                <Label htmlFor={'patientId'} className={classes.label}>
                    {fieldsMetadata['id']?.formName || i18n.t('Patient DRS ID')}
                </Label>
            </div>

            <div className={classes.input}>
                <div className={classes.inputContainer}>
                    <Input
                        name="patientId"
                        className={classes.input}
                        value={patientId}
                        onChange={handleChange}
                        placeholder={i18n.t('DRS-XXXXXXXX')}
                        disabled={isGenerated}
                    />

                    <Button
                        onClick={handleGenerateId}
                        disabled={isGenerated}
                    >
                        {i18n.t('Generate ID')}
                    </Button>
                </div>
                {!('id' in fieldsMetadata) && (
                    <Help error>
                        {i18n.t(drsIdWarning)}
                    </Help>
                )}
                {!isGenerated && ('id' in fieldsMetadata) && (
                    <Help>
                        {i18n.t('Click "Generate ID" to create a unique patient DRS ID, or enter one manually.')}
                    </Help>
                )}
            </div>
        </div>
    )
}
