import React, { FunctionComponent, useState } from 'react';
import * as styles from './styles/AddProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import SubpageTracker from './sub-components/SubpageTracker';
import API from './../../services/API';
import { useUserData } from '../../contexts/UserContext';

const AddProduct = () => {
  const userData = useUserData();

  // Page staging
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
    {
      number: 1,
      name: 'Primary Details'
    },
    {
      number: 2,
      name: 'Pricing'
    },
    {
      number: 3,
      name: 'Images'
    },
    {
      number: 4,
      name: 'Confirmation'
    }
  ];

  // Input boxes for form
  // Primary information
  const [productName, setProductName] = useState('');
  const [productDescription, setproductDescription] = useState('');

  // Pricing
  const [productPrice, setProductPrice] = useState('0.00');
  const [productDiscount, setProductDiscount] = useState('0.00');
  const [productCurrency, setProductCurrency] = useState('GBP'); // Don't need to set at the moment

  // Images
  const [productImages, setProductImages] = useState<string[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  const fixDecimalPlaces = (val: string, setFunction: (new_val: string) => void) => {
    let num = parseFloat(val);
    let cleannum = String(num.toFixed(2));
    if (val === "") {
      setFunction("0.00");
    } else {
      setFunction(cleannum);
    }
    console.log(val, setFunction,cleannum);
  }

  const nextStage = () => {
    // Check fields filled in
    if (activeStage === 0) {
      if (productName === '' || productDescription === '') {
        setErrorMessage('Please fill in empty fields');
        return;
      }
    } else if (activeStage === 1) {
      fixDecimalPlaces(productPrice, setProductPrice);
      fixDecimalPlaces(productDiscount, setProductDiscount);
      if (parseFloat(productPrice) === 0) {
        setErrorMessage('Please specify a non-zero price');
        return;
      }
    }
    setErrorMessage('');
    setActiveStage(activeStage + 1);
  }

  const previousStage = () => {
    setActiveStage(activeStage - 1);
  }

  const completeForm = async () => {
    let data = {
      "businessId": userData.user?.attributes.sub,
      "price": (parseFloat(productPrice) * 100),
      "discount": (parseFloat(productDiscount) * 100),
      "currency": "GBP",
      "active": true,
      "name": productName,
      "description": productDescription,
      "images": [
          
      ]
    }
    try {
      let response = await API.post(`/product/${userData.user?.attributes.sub}`,data);
      console.log(response);

      // Clear all responses and reset to first stage
      setProductName('');
      setproductDescription('');
      setProductPrice('0.00');
      setProductDiscount('0.00');
      setActiveStage(0);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <dashboardStyles.DashboardContainer fluid>
    <dashboardStyles.SectionTitle>Add Product</dashboardStyles.SectionTitle>
    <dashboardStyles.ContentBlockWrapper>
      <SubpageTracker stages={stages} activeStage={activeStage}></SubpageTracker>
      <dashboardStyles.InformationWrapper direction={'row'}>
        <dashboardStyles.InformationSubBox>
          {
            (activeStage === 0) ? <styles.FormBox>
              <styles.SingleInput>
                <styles.InputLabel>Product Name</styles.InputLabel>
                <styles.InputInput value={productName} onChange={e => {setProductName(e.target.value)}} />
              </styles.SingleInput>
              <styles.SingleInput>
                <styles.InputLabel>Product Description</styles.InputLabel>
                <styles.InputTextarea value={productDescription} onChange={e => {setproductDescription(e.target.value)}} />
              </styles.SingleInput>
            </styles.FormBox>
             : null
          }

          {
            (activeStage === 1) ? <styles.FormBox>
              <styles.SingleInput>
                <styles.InputLabel>Product Price (GBP)</styles.InputLabel>
                <styles.InputInput 
                  type="number"
                  step="0.01"
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                  onBlur={() => fixDecimalPlaces(productPrice, setProductPrice)}
                />
              </styles.SingleInput>
              <styles.SingleInput>
                <styles.InputLabel>Product Discount (GBP)</styles.InputLabel>
                <styles.InputInput
                type="number"
                step="0.01"
                value={productDiscount}
                onChange={e => setProductDiscount(e.target.value)}
                onBlur={() => fixDecimalPlaces(productDiscount, setProductDiscount)}
              />
              </styles.SingleInput>
            </styles.FormBox>
             : null
          }

          {
            (activeStage === 2) ? 
              <p>Image uploading not currently supported</p>
             : null
          }

          {
            (activeStage === 3) ? 
              <>
                <styles.ConfirmationText>Confirm Details</styles.ConfirmationText>
                <styles.ConfirmationField>
                  <styles.FieldName>Name</styles.FieldName>
                  <styles.FieldValue>{productName}</styles.FieldValue>
                </styles.ConfirmationField>
                <styles.ConfirmationField>
                  <styles.FieldName>Description</styles.FieldName>
                  <styles.FieldValue>{productDescription}</styles.FieldValue>
                </styles.ConfirmationField>
                <styles.ConfirmationField>
                  <styles.FieldName>Price</styles.FieldName>
                  <styles.FieldValue>£{parseFloat(productPrice).toFixed(2)}</styles.FieldValue>
                </styles.ConfirmationField>
                <styles.ConfirmationField>
                  <styles.FieldName>Discount</styles.FieldName>
                  <styles.FieldValue>£{parseFloat(productDiscount).toFixed(2)}</styles.FieldValue>
                </styles.ConfirmationField>
              </>
             : null
          }

          {(errorMessage !== '') ? 
          <styles.ErrorMessage>{errorMessage}</styles.ErrorMessage>
          : null}
          <styles.NavigationButtonGroup>
            { ((activeStage +1) !== stages.length) ? 
            <styles.NextButton variant='outline-primary' onClick={() => nextStage()}>
              Next&nbsp;&nbsp;
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </styles.NextButton>
            : <styles.CompleteButton onClick={() => completeForm()}>
              Complete&nbsp;&nbsp;
              <FontAwesomeIcon icon={faCheckCircle} />
            </styles.CompleteButton>}
            { (activeStage !== 0) ?
            <styles.BackButton variant='outline-secondary' onClick={() => previousStage()}>
              <FontAwesomeIcon icon={faArrowCircleLeft} />
              &nbsp;&nbsp;Back
            </styles.BackButton>
             : null}
          </styles.NavigationButtonGroup>
        </dashboardStyles.InformationSubBox>
      </dashboardStyles.InformationWrapper>
    </dashboardStyles.ContentBlockWrapper>
  </dashboardStyles.DashboardContainer>
  )
}

export default AddProduct;
