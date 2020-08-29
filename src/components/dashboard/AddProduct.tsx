import React, { FunctionComponent, useState, useCallback } from 'react';

// Contexts
import { useHistory } from 'react-router-dom';
import { useUserData } from '../../contexts/UserContext';
import { useProductData } from '../../contexts/ProductDataContext';

// Styles
import * as styles from './styles/AddProductStyles';
import * as dashboardStyles from './styles/DashboardStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';

// Components
import SubpageTracker from './sub-components/SubpageTracker';
import ImageResize from './../image/ImageResize';

// Services
import { getCroppedImg } from './../../services/canvasUtils';
import API from './../../services/API';

const AddProduct = () => {
  const userData = useUserData();
  const history = useHistory();
  const productData = useProductData();

  // Page staging
  const [activeStage, setActiveStage] = useState(0);
  const stages = [
      'Primary Details',
      'Pricing',
      'Images',
      'Stock',
      'Confirmation'
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

  // Stock 
  const [stock, setStock] = useState('1');

  // Navigation buttons
  const [showNextButton, setShowNextButton] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const fixDecimalPlaces = (val: string, setFunction: (new_val: string) => void) => {
    let num = parseFloat(val);
    let cleannum = String(num.toFixed(2));
    if (val === "") {
      setFunction("0.00");
    } else {
      setFunction(cleannum);
    }
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
      setLoading(true);
      await createCroppedImage();
      setLoading(false);

    } else if (activeStage === 3) {
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

  // Image
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string|undefined>(undefined);

  const onFileChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl: string = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  }

  const readFile = (file: any): Promise<string> => {
    return new Promise(resolve => {
      const reader: any = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    })
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

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, [])

  const completeForm = async () => {
    setLoading(true);
    if (!croppedImage) return;
    let blob = await fetch(croppedImage).then(r => r.blob());
    let base64Image = await readFile(blob);
    let data_image = {
      imageData: base64Image,
      businessId: userData.user?.attributes.sub,
    }

    let url;

    try {
      let response = await API.post(`/image`,data_image);
      url = response.data.location;

    } catch (err) {
      setLoading(false);
      return;
    }

    let data = {
      businessId: userData.user?.attributes.sub,
      price: (Math.round(parseFloat(productPrice) * 100)),
      discount: (parseFloat(productDiscount)),
      currency: "GBP",
      active: true,
      stock: (Math.round(parseFloat(stock))),
      name: productName,
      description: productDescription,
      images: [
          url
      ]
    }
    try {
      let response = await API.post(`/product/${userData.user?.attributes.sub}`,data);
      // Update product list with new product
      await productData.getProductsData(true);
      history.push('/dashboard/products')
    } catch (err) {
    }
    setLoading(false);
  }

  const resetFields = () => {
    // Clear all responses and reset to first stage
    setProductName('');
    setproductDescription('');
    setProductPrice('0.00');
    setProductDiscount('0.00');
    setActiveStage(0);
    setImageSrc(undefined);
    
    setShowCompleteButton(false);
    setShowNextButton(true);
    setShowBackButton(false);
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
              <ImageResize 
                onCropComplete={onCropComplete}
                croppedAreaPixels={croppedAreaPixels}
                imageSrc={imageSrc}
              />
              : <styles.FormBox>
                <styles.InputLabel>Choose image</styles.InputLabel>
                <styles.InputFile
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </styles.FormBox>
             : null
          }

          {
            (activeStage === 3) ? <styles.FormBox>
              <styles.SingleInput>
                <styles.InputLabel>Max purchase quantity (number able to be added to cart)</styles.InputLabel>
                <styles.InputLabelSubtitle>(0 sets as out of stock)</styles.InputLabelSubtitle>
                <styles.InputInput type="number" value={stock} onChange={e => {setStock(e.target.value)}} />
              </styles.SingleInput>
            </styles.FormBox>
             : null
          }

          {
            (activeStage === 4) ? 
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
                <styles.ConfirmationField>
                  <styles.FieldName>Max purchase quantity</styles.FieldName>
                  <styles.FieldValue>{stock}</styles.FieldValue>
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
            <styles.NextButton variant='outline-primary' disabled={loading ? true : false} onClick={() => nextStage()}>
              {loading 
              ? <><Spinner animation="border" size="sm" />&nbsp;&nbsp;Loading...</> 
              : <>Next&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowCircleRight} /></>}
            </styles.NextButton> : null }
            { (showCompleteButton) ? <styles.CompleteButton disabled={loading ? true : false} onClick={() => completeForm()}>
              {loading 
              ? <><Spinner animation="border" size="sm" />&nbsp;&nbsp;Loading...</> 
              : <>Complete&nbsp;&nbsp;<FontAwesomeIcon icon={faCheckCircle} /></>}
            </styles.CompleteButton> : null }
            { (showBackButton) ?
            <styles.BackButton variant='outline-secondary' disabled={loading ? true : false} onClick={() => previousStage()}>
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
