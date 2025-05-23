export default function StickySample() {
  return (
    <div style={{ height: '200vh', background: '#eee', padding: 0, margin: 0 }}>
      <div style={{ height: 60 }} />
      <div
        style={{
          position: 'sticky',
          top: 0,
          background: 'pink',
          padding: 20,
          zIndex: 9999,
          border: '2px solid red',
        }}
      >
        stickyテスト：このピンクのボックスがスクロールしても上部に固定されていればOK
      </div>
      <div style={{ height: '180vh', background: '#eee' }} />
    </div>
  );
}
