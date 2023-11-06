/*
 * Copyright (c) 2010, 2023 BSI Business Systems Integration AG
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 */
import {Action, Alignment, GroupBox, GroupBoxModel, InitModelOf, MenuBarBox, models} from '@eclipse-scout/core';
import {ActionPropertiesBoxWidgetMap} from '../index';
import ActionPropertiesBoxModel from './ActionPropertiesBoxModel';

export class ActionPropertiesBox extends GroupBox {
  declare widgetMap: ActionPropertiesBoxWidgetMap;

  field: Action;

  constructor() {
    super();
    this.field = null;
  }

  protected override _jsonModel(): GroupBoxModel {
    return models.get(ActionPropertiesBoxModel);
  }

  protected override _init(model: InitModelOf<this>) {
    super._init(model);

    this._setField(this.field);
  }

  setField(field: Action) {
    this.setProperty('field', field);
  }

  // noinspection DuplicatedCode
  protected _setField(field: Action) {
    this._setProperty('field', field);
    this.setEnabled(!!this.field);
    if (!this.field) {
      return;
    }
    let enabledField = this.widget('EnabledField');
    enabledField.setValue(this.field.enabled);
    enabledField.on('propertyChange:value', event => this.field.setEnabled(event.newValue));

    let visibleField = this.widget('VisibleField');
    visibleField.setValue(this.field.visible);
    visibleField.on('propertyChange:value', event => this.field.setVisible(event.newValue));

    let toggleActionField = this.widget('ToggleActionField');
    toggleActionField.setValue(this.field.toggleAction);
    toggleActionField.on('propertyChange:value', event => this.field.setToggleAction(event.newValue));

    let selectedField = this.widget('SelectedField');
    selectedField.setValue(this.field.selected);
    selectedField.on('propertyChange:value', event => this.field.setSelected(event.newValue));

    let preventDoubleClickField = this.widget('PreventDoubleClickField');
    preventDoubleClickField.setValue(this.field.preventDoubleClick);
    preventDoubleClickField.on('propertyChange:value', event => this.field.setPreventDoubleClick(event.newValue));

    let inheritAccessibilityField = this.widget('InheritAccessibilityField');
    inheritAccessibilityField.setValue(this.field.inheritAccessibility);
    inheritAccessibilityField.on('propertyChange:value', event => this.field.setInheritAccessibility(event.newValue));

    let loadingField = this.widget('LoadingField');
    loadingField.setValue(this.field.loading);
    loadingField.on('propertyChange:value', event => this.field.setLoading(event.newValue));

    let iconIdField = this.widget('IconIdField');
    iconIdField.setValue(this.field.iconId);
    iconIdField.on('propertyChange:value', event => this.field.setIconId(event.newValue));

    let keyStrokeField = this.widget('KeyStrokeField');
    keyStrokeField.setValue(this.field.keyStroke);
    keyStrokeField.on('propertyChange:value', event => this.field.setKeyStroke(event.newValue));

    let textField = this.widget('TextField');
    textField.setValue(this.field.text);
    textField.on('propertyChange:value', event => this.field.setText(event.newValue));

    let textPositionField = this.widget('TextPositionField');
    textPositionField.setValue(this.field.textPosition);
    textPositionField.on('propertyChange:value', event => this.field.setTextPosition(event.newValue));

    let tooltipTextField = this.widget('TooltipTextField');
    tooltipTextField.setValue(this.field.tooltipText);
    tooltipTextField.on('propertyChange:value', event => this.field.setTooltipText(event.newValue));

    let horizontalAlignmentField = this.widget('HorizontalAlignmentField');
    horizontalAlignmentField.setValue(this.field.horizontalAlignment);
    horizontalAlignmentField.on('propertyChange:value', event => this.field.setHorizontalAlignment(Math.sign(event.newValue) as Alignment));

    let actionStyleField = this.widget('ActionStyleField');
    actionStyleField.setValue(this.field.actionStyle);
    actionStyleField.on('propertyChange:value', event => {
      // ActionStyle may not be changed during run time officially, use this little hack to work around by rerendering the whole menu bar
      this.field.actionStyle = event.newValue;
      if (this.field.parent instanceof MenuBarBox) {
        let menuBarBox = this.field.parent;
        let menuItems = menuBarBox.menuItems;
        menuBarBox.setMenuItems([]);
        menuBarBox.setMenuItems(menuItems);
      }
    });
  }
}
