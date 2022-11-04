/*
 * Copyright (c) 2022 BSI Business Systems Integration AG.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Distribution License v1.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/org/documents/edl-v10.html
 *
 * Contributors:
 *     BSI Business Systems Integration AG - initial API and implementation
 */
import {GroupBox, GroupBoxModel, InitModelOf, models, ValueField} from '@eclipse-scout/core';
import ValueFieldPropertiesBoxModel from './ValueFieldPropertiesBoxModel';
import {ValueFieldPropertiesBoxWidgetMap} from '../index';

export class ValueFieldPropertiesBox extends GroupBox {
  declare widgetMap: ValueFieldPropertiesBoxWidgetMap;

  field: ValueField<any>;

  constructor() {
    super();
    this.field = null;
  }

  protected override _jsonModel(): GroupBoxModel {
    return models.get(ValueFieldPropertiesBoxModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    this._setField(this.field);
    this.widget('ValueField').setTrimText(false);
    this.widget('DisplayTextField').setTrimText(false);
  }

  setField(field: ValueField<any>) {
    this.setProperty('field', field);
  }

  protected _setField(field: ValueField<any>) {
    this._setProperty('field', field);
    if (!this.field) {
      return;
    }
    this.field.on('propertyChange:value', event => this.widget('ValueField').setValue(event.newValue));
    this.field.on('propertyChange:displayText', event => this.widget('DisplayTextField').setValue(event.newValue));

    let valueField = this.widget('ValueField');
    valueField.setValue(this.field.value);
    if (valueField.enabled) {
      valueField.on('propertyChange:value', event => this.field.setValue(this.parseValue(event.newValue)));
    }

    let displayTextField = this.widget('DisplayTextField');
    displayTextField.setValue(this.field.displayText);
    if (displayTextField.enabled) {
      displayTextField.on('propertyChange:value', event => this.field.setDisplayText(event.newValue));
    }

    let clearableField = this.widget('ClearableField');
    clearableField.setValue(this.field.clearable);
    clearableField.on('propertyChange:value', event => this.field.setClearable(event.newValue));
  }

  parseValue(newValue: string): any {
    return newValue;
  }
}
