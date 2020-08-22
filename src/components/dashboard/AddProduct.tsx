import React, { FunctionComponent, useState, useCallback } from 'react';
import * as styles from './styles/AddProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'react-easy-crop';
import SubpageTracker from './sub-components/SubpageTracker';
import API from './../../services/API';
import { getCroppedImg } from './../../services/canvasUtils';
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
  const [productDiscount, setProductDiscount] = useState('0');
  const [productCurrency, setProductCurrency] = useState('GBP'); // Don't need to set at the moment

  // Images
  const [productImages, setProductImages] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState<string|undefined>(undefined);
  
  const [errorMessage, setErrorMessage] = useState('');

  // Navigation buttons
  const [showNextButton, setShowNextButton] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

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

  const nextStage = async () => {
    // Check fields filled in
    if (activeStage === 0) {
      if (productName === '' || productDescription === '') {
        setErrorMessage('Please fill in empty fields');
        return;
      } else {
        setShowBackButton(true);
      }
    } else if (activeStage === 1) {
      fixDecimalPlaces(productPrice, setProductPrice);
      fixDecimalPlaces(productDiscount, setProductDiscount);
      if (parseFloat(productPrice) === 0) {
        setErrorMessage('Please specify a non-zero price');
        return;
      }
    } else if (activeStage === 2) {
      if (imageSrc === undefined) {
        setErrorMessage('Please upload an image');
        return;
      }
      await createCroppedImage();
      setShowNextButton(false);
      setShowCompleteButton(true);
    }
    setErrorMessage('');
    setActiveStage(activeStage + 1);
  }

  const previousStage = () => {
    if (activeStage === 0) {
      return;
    } else if (activeStage === 1) {
      setShowBackButton(false);
    } else if (activeStage === 3) {
      setShowCompleteButton(false);
      setShowNextButton(true);
    }
    setActiveStage(activeStage - 1);
  }

  const completeForm = async () => {
    let data = {
      "businessId": userData.user?.attributes.sub,
      "price": (Math.round(parseFloat(productPrice) * 100)),
      "discount": (parseFloat(productDiscount)),
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
      setImageSrc(undefined);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedImage(undefined);
      setCroppedAreaPixels(null);
      setShowCompleteButton(false);
      setShowNextButton(true);
      setShowBackButton(false);
    } catch (err) {
      console.log(err);
    }
  }

  // Image cropper
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string|undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  
  const readFile = (file: any): Promise<string> => {
    return new Promise(resolve => {
      const reader: any = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: string = await readFile(file);
      console.log(imageDataUrl);

      setImageSrc(imageDataUrl);
    }
  }

  const createCroppedImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          imageSrc,
          croppedAreaPixels,
          500,
          500
        )
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e)
    }
  }, [imageSrc, croppedAreaPixels]);

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
                <styles.InputLabel>Pre-Sale Price (GBP)</styles.InputLabel>
                <styles.InputInput 
                  type="number"
                  step="0.01"
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                  onBlur={() => fixDecimalPlaces(productPrice, setProductPrice)}
                />
              </styles.SingleInput>
              <styles.SingleInput>
                <styles.InputLabel>Discount (%)</styles.InputLabel>
                <styles.InputInput
                type="number"
                value={productDiscount}
                onChange={e => setProductDiscount(e.target.value)}
              />
              </styles.SingleInput>
              <styles.FieldName>Customer Pays:</styles.FieldName>
              <styles.FieldValue>£{(parseFloat(productPrice)*(1 - parseFloat(productDiscount)/100)).toFixed(2)}</styles.FieldValue>
            </styles.FormBox>
             : null
          }

          {
            (activeStage === 2) ? 
              (imageSrc) ?
              <styles.ImageCropperWrapper>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </styles.ImageCropperWrapper>
              : <styles.FormBox>
                <styles.InputLabel>Choose image</styles.InputLabel>
                <styles.InputFile
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onFileChange}
                />
              </styles.FormBox>
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
                  <styles.FieldValue>{parseFloat(productDiscount)}%</styles.FieldValue>
                </styles.ConfirmationField>
                {(croppedImage) ?
                  <styles.ConfirmationField>
                    <styles.FieldName>Image</styles.FieldName>
                    <styles.FieldValue><styles.FieldImage src={croppedImage} /></styles.FieldValue>
                  </styles.ConfirmationField> : null
                }
              </>
             : null
          }

          {(errorMessage !== '') ? 
          <styles.ErrorMessage>{errorMessage}</styles.ErrorMessage>
          : null}
          <styles.NavigationButtonGroup>
            { (showNextButton) ? 
            <styles.NextButton variant='outline-primary' onClick={() => nextStage()}>
              Next&nbsp;&nbsp;
              <FontAwesomeIcon icon={faArrowCircleRight} />
            </styles.NextButton> : null }
            { (showCompleteButton) ? <styles.CompleteButton onClick={() => completeForm()}>
              Complete&nbsp;&nbsp;
              <FontAwesomeIcon icon={faCheckCircle} />
            </styles.CompleteButton> : null }
            { (showBackButton) ?
            <styles.BackButton variant='outline-secondary' onClick={() => previousStage()}>
              <FontAwesomeIcon icon={faArrowCircleLeft} />
              &nbsp;&nbsp;Back
            </styles.BackButton>: null}
          </styles.NavigationButtonGroup>
        </dashboardStyles.InformationSubBox>
      </dashboardStyles.InformationWrapper>
    </dashboardStyles.ContentBlockWrapper>
  </dashboardStyles.DashboardContainer>
  )
}

export default AddProduct;
