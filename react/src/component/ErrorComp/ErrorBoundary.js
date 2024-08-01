import React from 'react';

// ErrorBoundary 컴포넌트 정의
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 다음 렌더링에서 폴백 UI가 표시됩니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로그를 기록하거나 에러를 외부 서비스에 전송합니다.
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    // 데이터 다시 불러오기 로직 추가
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 사용자 정의
      return (
        <div>
          <p>데이터를 불러올 수 없습니다.</p>
          <button onClick={this.handleRetry}>다시 시도</button>
        </div>
      );
    }

    // 자식 컴포넌트를 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;
